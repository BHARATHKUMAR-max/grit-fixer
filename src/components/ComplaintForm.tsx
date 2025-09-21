import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { NewComplaint, CATEGORIES, PRIORITIES } from '@/types/complaint';
import { Mail, Send } from 'lucide-react';

interface ComplaintFormProps {
  onSuccess?: () => void;
}

export const ComplaintForm = ({ onSuccess }: ComplaintFormProps) => {
  const [formData, setFormData] = useState<NewComplaint>({
    title: '',
    description: '',
    category: '',
    priority: 'Medium',
    user_email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('complaints')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been successfully submitted. We'll review it promptly.",
        className: "bg-success-light border-success text-success-foreground",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        priority: 'Medium',
        user_email: '',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your complaint. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card">
      <CardHeader className="text-center space-y-2">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-2">
          <Mail className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">Submit a Complaint</CardTitle>
        <CardDescription className="text-muted-foreground">
          Help us improve by sharing your concerns. We take all feedback seriously.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title *</Label>
            <Input
              id="title"
              placeholder="Brief summary of your issue"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com (optional)"
              value={formData.user_email}
              onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
              className="transition-all duration-200 focus:shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="transition-all duration-200 focus:shadow-sm">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Priority Level *</Label>
            <RadioGroup
              value={formData.priority}
              onValueChange={(value: 'Low' | 'Medium' | 'High') => setFormData({ ...formData, priority: value })}
              className="flex space-x-6"
            >
              {PRIORITIES.map((priority) => (
                <div key={priority} className="flex items-center space-x-2">
                  <RadioGroupItem value={priority} id={priority} />
                  <Label htmlFor={priority} className="cursor-pointer">
                    {priority}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your complaint..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="transition-all duration-200 focus:shadow-sm resize-none"
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-elegant transition-all duration-300"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-4 h-4" />
                <span>Submit Complaint</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};