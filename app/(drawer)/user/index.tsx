import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, 
  Bell, 
  Shield, 
  Heart, 
  Mail, 
  Lock, 
  Moon, 
  Globe, 
  Smartphone,
  Camera,
  User,
  MapPin,
  Calendar,
  Award,
  Target,
  Trophy
} from 'lucide-react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);

  // Mock user data
  const user = {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    memberSince: "January 2022",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    location: "San Francisco, CA",
    bio: "Digital designer & photographer. Love to travel and capture moments that last forever."
  };

  // Mock stats data
  const stats = [
    { icon: <Award size={20} color="#6366f1" />, label: "Achievements", value: "24" },
    { icon: <Target size={20} color="#ec4899" />, label: "Goals", value: "12" },
    { icon: <Trophy size={20} color="#10b981" />, label: "Badges", value: "8" },
    { icon: <User size={20} color="#f59e0b" />, label: "Friends", value: "142" }
  ];

  // Settings options
  const settingsOptions = [
    { icon: <Bell size={20} color="#4f46e5" />, label: "Notifications", value: "On", type: "toggle", state: notifications, setState: setNotifications },
    { icon: <Shield size={20} color="#4f46e5" />, label: "Privacy", value: "Manage", type: "link" },
    { icon: <Heart size={20} color="#4f46e5" />, label: "Favorites", value: "Manage", type: "link" },
    { icon: <Mail size={20} color="#4f46e5" />, label: "Email Preferences", value: "Update", type: "link" },
    { icon: <Lock size={20} color="#4f46e5" />, label: "Security", value: "Updated", type: "link" },
    { icon: <Moon size={20} color="#4f46e5" />, label: "Dark Mode", value: darkMode ? "On" : "Off", type: "toggle", state: darkMode, setState: setDarkMode },
    { icon: <Globe size={20} color="#4f46e5" />, label: "Language", value: "English", type: "link" },
    { icon: <Smartphone size={20} color="#4f46e5" />, label: "Connected Apps", value: "3", type: "link" }
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Profile</Text>
          <TouchableOpacity className="p-2 rounded-full bg-white shadow-sm">
            <Settings size={24} color="#4f46e5" />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <View className="items-center mb-6">
            <View className="relative">
              <Image 
                source={{ uri: user.avatar }} 
                className="w-24 h-24 rounded-full border-4 border-indigo-100"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-indigo-500 rounded-full p-2 border-2 border-white">
                <Camera size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-xl font-bold text-gray-900 mt-4">{user.name}</Text>
            <Text className="text-gray-500">{user.email}</Text>
            <View className="flex-row items-center mt-2">
              <MapPin size={16} color="#94a3b8" />
              <Text className="text-gray-500 ml-1">{user.location}</Text>
            </View>
          </View>

          <Text className="text-gray-600 text-center italic">{user.bio}</Text>

          <View className="flex-row justify-center items-center mt-4">
            <Calendar size={16} color="#94a3b8" />
            <Text className="text-gray-500 ml-2">Member since {user.memberSince}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Statistics</Text>
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <View 
                key={index} 
                className="w-[48%] bg-gray-50 rounded-xl p-4 mb-4"
              >
                <View className="flex-row items-center mb-2">
                  <View className="mr-2">
                    {stat.icon}
                  </View>
                  <Text className="font-semibold text-gray-700">{stat.label}</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-900">{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View className="bg-white rounded-2xl shadow-sm p-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Settings</Text>
          {settingsOptions.map((setting, index) => (
            <TouchableOpacity 
              key={index} 
              className={`flex-row items-center justify-between py-4 ${index !== settingsOptions.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <View className="flex-row items-center">
                <View className="mr-3">
                  {setting.icon}
                </View>
                <Text className="text-gray-700 font-medium">{setting.label}</Text>
              </View>
              
              {setting.type === "toggle" ? (
                <Switch
                  value={setting.state}
                  onValueChange={setting.setState}
                  trackColor={{ false: "#e2e8f0", true: "#c7d2fe" }}
                  thumbColor={setting.state ? "#4f46e5" : "#f1f5f9"}
                />
              ) : (
                <View className="flex-row items-center">
                  <Text className="text-gray-500 mr-2">{setting.value}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity className="mt-6 bg-red-500 py-4 rounded-2xl items-center justify-center">
          <Text className="text-white font-bold text-lg">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}