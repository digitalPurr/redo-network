import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { DiscordBridge } from '@/lib/discord-bridge';
import { useToast } from '@/hooks/use-toast';

interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assigned_to: string;
  due_date: string;
  project_id: string;
}

const TaskManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'todo',
    assigned_to: '',
    due_date: '',
    project_id: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert task into database
      const { data: task, error } = await supabase
        .from('tasks')
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      // Send Discord notification
      await DiscordBridge.notifyTaskCreated({
        ...task,
        status: task.status as 'todo' | 'in_progress' | 'review' | 'done'
      });

      toast({
        title: "Task Created",
        description: "Task has been created and Discord notification sent.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        assigned_to: '',
        due_date: '',
        project_id: ''
      });

    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: "Error",
        description: "Failed to create task.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="project_id">Project ID</Label>
          <Input
            id="project_id"
            value={formData.project_id}
            onChange={(e) => handleChange('project_id', e.target.value)}
            placeholder="Enter project UUID"
            required
          />
        </div>

        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Task title"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Task description"
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="assigned_to">Assigned To</Label>
          <Input
            id="assigned_to"
            value={formData.assigned_to}
            onChange={(e) => handleChange('assigned_to', e.target.value)}
            placeholder="Username or email"
          />
        </div>

        <div>
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="datetime-local"
            value={formData.due_date}
            onChange={(e) => handleChange('due_date', e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Task'}
        </Button>
      </form>
    </Card>
  );
};

export default TaskManager;