import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ComplaintForm } from '@/components/ComplaintForm';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Shield, Users, CheckCircle } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('submit');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ComplaintHub</h1>
                <p className="text-sm text-muted-foreground">Professional Complaint Management</p>
              </div>
            </div>
            <Button
              variant={activeTab === 'admin' ? 'default' : 'outline'}
              onClick={() => setActiveTab(activeTab === 'admin' ? 'submit' : 'admin')}
              className="flex items-center space-x-2"
            >
              <Shield className="w-4 h-4" />
              <span>{activeTab === 'admin' ? 'User View' : 'Admin Panel'}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-card shadow-card">
            <TabsTrigger value="submit" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Submit Complaint</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submit" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                We Value Your Feedback
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Your concerns matter to us. Submit a complaint and help us improve our services for everyone.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quick Response</h3>
                  <p className="text-sm text-muted-foreground">
                    We review all complaints promptly and keep you updated on progress.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    Your information is protected and handled with complete confidentiality.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Resolution Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track the status of your complaint from submission to resolution.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Complaint Form */}
            <ComplaintForm />
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ComplaintHub. Built with care for better customer service.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;