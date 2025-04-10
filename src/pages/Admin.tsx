import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { UserPreferences } from '@/lib/supabase';
import { useAuth } from '@/App';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user, isAuthenticated } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect to auth page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('auth.users')
        .select('*');

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch preferences
      const { data: preferencesData, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*');

      if (preferencesError) throw preferencesError;
      setPreferences(preferencesData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Database Admin</h1>
        <div className="space-x-2">
          <span className="text-sm text-gray-500">Logged in as: {user?.email}</span>
          <Button onClick={fetchData}>Refresh Data</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Dietary Restrictions</TableHead>
                <TableHead>Allergies</TableHead>
                <TableHead>Favorite Cuisines</TableHead>
                <TableHead>Cooking Level</TableHead>
                <TableHead>Prep Frequency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {preferences.map((pref) => (
                <TableRow key={pref.id}>
                  <TableCell>{pref.user_id}</TableCell>
                  <TableCell>{pref.dietary_restrictions?.join(', ') || 'None'}</TableCell>
                  <TableCell>{pref.allergies?.join(', ') || 'None'}</TableCell>
                  <TableCell>{pref.favorite_cuisines?.join(', ') || 'None'}</TableCell>
                  <TableCell>{pref.cooking_skill_level}</TableCell>
                  <TableCell>{pref.meal_prep_frequency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin; 