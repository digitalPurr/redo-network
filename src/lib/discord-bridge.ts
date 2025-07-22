import { supabase } from '@/integrations/supabase/client'

interface TaskData {
  id?: string
  project_id: string
  title: string
  description?: string
  status?: 'todo' | 'in_progress' | 'review' | 'done'
  assigned_to?: string
  due_date?: string
}

interface ProjectData {
  id: string
  title: string
  description?: string
  category?: string
  status?: 'active' | 'completed' | 'archived'
}

class DiscordBridge {
  private static async callEdgeFunction(type: string, data: any) {
    try {
      console.log('Calling Discord bridge:', { type, data })
      
      const { error } = await supabase.functions.invoke('discord-bridge', {
        body: { type, data }
      })

      if (error) {
        console.error('Discord bridge error:', error)
        throw error
      }

      console.log('Discord notification sent successfully')
    } catch (error) {
      console.error('Failed to send Discord notification:', error)
      // Don't throw - we don't want Discord failures to break the main flow
    }
  }

  static async notifyTaskCreated(taskData: TaskData) {
    await this.callEdgeFunction('task_created', taskData)
  }

  static async notifyTaskUpdated(taskData: TaskData) {
    await this.callEdgeFunction('task_updated', taskData)
  }

  static async notifyProjectUpdated(projectData: ProjectData) {
    await this.callEdgeFunction('project_updated', projectData)
  }
}

export { DiscordBridge }