-- Create complaints table
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('Low', 'Medium', 'High')),
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Resolved')),
  user_email TEXT,
  date_submitted TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we don't have auth yet)
CREATE POLICY "Anyone can view complaints" 
ON public.complaints 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create complaints" 
ON public.complaints 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update complaints" 
ON public.complaints 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete complaints" 
ON public.complaints 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_complaints_updated_at
BEFORE UPDATE ON public.complaints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.complaints (title, description, category, priority, status, user_email) VALUES
('Product not working as expected', 'The product I purchased last week is not functioning properly. It keeps shutting down randomly.', 'Product', 'High', 'Pending', 'user1@example.com'),
('Slow customer service response', 'I have been waiting for a response to my inquiry for over 3 days. This is unacceptable.', 'Service', 'Medium', 'In Progress', 'user2@example.com'),
('Billing discrepancy', 'I was charged twice for the same order. Please resolve this immediately.', 'Support', 'High', 'Pending', 'user3@example.com'),
('Website loading issues', 'Your website is very slow and sometimes does not load at all.', 'Support', 'Low', 'Resolved', 'user4@example.com');