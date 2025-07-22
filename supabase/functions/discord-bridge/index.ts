import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface DiscordWebhookPayload {
  content?: string
  embeds?: Array<{
    title?: string
    description?: string
    color?: number
    fields?: Array<{
      name: string
      value: string
      inline?: boolean
    }>
    timestamp?: string
  }>
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { type, data } = await req.json()

    console.log('Discord bridge received:', { type, data })

    switch (type) {
      case 'task_created':
        await handleTaskCreated(supabase, data)
        break
      case 'task_updated':
        await handleTaskUpdated(supabase, data)
        break
      case 'project_updated':
        await handleProjectUpdated(supabase, data)
        break
      default:
        console.log('Unknown event type:', type)
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )

  } catch (error) {
    console.error('Discord bridge error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  }
})

async function handleTaskCreated(supabase: any, taskData: any) {
  console.log('Handling task created:', taskData)

  // Get project details and Discord config
  const { data: project } = await supabase
    .from('projects')
    .select('title')
    .eq('id', taskData.project_id)
    .single()

  const { data: discordConfig } = await supabase
    .from('discord_config')
    .select('webhook_url')
    .eq('project_id', taskData.project_id)
    .single()

  if (!discordConfig?.webhook_url) {
    console.log('No Discord webhook configured for project:', taskData.project_id)
    return
  }

  const embed = {
    title: "📋 New Task Created",
    description: taskData.title,
    color: 0x00ff88, // Green
    fields: [
      {
        name: "Project",
        value: project?.title || "Unknown Project",
        inline: true
      },
      {
        name: "Status",
        value: taskData.status || "todo",
        inline: true
      },
      {
        name: "Assigned To",
        value: taskData.assigned_to || "Unassigned",
        inline: true
      }
    ],
    timestamp: new Date().toISOString()
  }

  if (taskData.description) {
    embed.fields.push({
      name: "Description",
      value: taskData.description.substring(0, 500) + (taskData.description.length > 500 ? "..." : ""),
      inline: false
    })
  }

  if (taskData.due_date) {
    embed.fields.push({
      name: "Due Date",
      value: new Date(taskData.due_date).toLocaleDateString(),
      inline: true
    })
  }

  await sendDiscordMessage(discordConfig.webhook_url, { embeds: [embed] })
}

async function handleTaskUpdated(supabase: any, taskData: any) {
  console.log('Handling task updated:', taskData)

  // Get project details and Discord config
  const { data: project } = await supabase
    .from('projects')
    .select('title')
    .eq('id', taskData.project_id)
    .single()

  const { data: discordConfig } = await supabase
    .from('discord_config')
    .select('webhook_url')
    .eq('project_id', taskData.project_id)
    .single()

  if (!discordConfig?.webhook_url) {
    console.log('No Discord webhook configured for project:', taskData.project_id)
    return
  }

  const statusColors: Record<string, number> = {
    'todo': 0x888888,       // Gray
    'in_progress': 0xffaa00, // Orange
    'review': 0x0099ff,     // Blue
    'done': 0x00ff00        // Green
  }

  const embed = {
    title: "🔄 Task Updated",
    description: taskData.title,
    color: statusColors[taskData.status] || 0x888888,
    fields: [
      {
        name: "Project",
        value: project?.title || "Unknown Project",
        inline: true
      },
      {
        name: "Status",
        value: taskData.status || "todo",
        inline: true
      },
      {
        name: "Assigned To",
        value: taskData.assigned_to || "Unassigned",
        inline: true
      }
    ],
    timestamp: new Date().toISOString()
  }

  await sendDiscordMessage(discordConfig.webhook_url, { embeds: [embed] })
}

async function handleProjectUpdated(supabase: any, projectData: any) {
  console.log('Handling project updated:', projectData)

  // Get Discord config for this project
  const { data: discordConfig } = await supabase
    .from('discord_config')
    .select('webhook_url')
    .eq('project_id', projectData.id)
    .single()

  if (!discordConfig?.webhook_url) {
    console.log('No Discord webhook configured for project:', projectData.id)
    return
  }

  const embed = {
    title: "🚀 Project Updated",
    description: projectData.title,
    color: 0x6600cc, // Purple
    fields: [
      {
        name: "Category",
        value: projectData.category || "Uncategorized",
        inline: true
      },
      {
        name: "Status",
        value: projectData.status || "active",
        inline: true
      }
    ],
    timestamp: new Date().toISOString()
  }

  if (projectData.description) {
    embed.fields.push({
      name: "Description",
      value: projectData.description.substring(0, 500) + (projectData.description.length > 500 ? "..." : ""),
      inline: false
    })
  }

  await sendDiscordMessage(discordConfig.webhook_url, { embeds: [embed] })
}

async function sendDiscordMessage(webhookUrl: string, payload: DiscordWebhookPayload) {
  try {
    console.log('Sending Discord message to:', webhookUrl)
    console.log('Payload:', JSON.stringify(payload, null, 2))

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Discord webhook failed:', response.status, errorText)
      throw new Error(`Discord webhook failed: ${response.status} ${errorText}`)
    }

    console.log('Discord message sent successfully')
  } catch (error) {
    console.error('Error sending Discord message:', error)
    throw error
  }
}