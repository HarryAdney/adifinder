import React from 'react';
import { Star, Clock, PoundSterling, Phone } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="overflow-hidden bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
        <div className="flex items-center mt-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">
            {instructor.rating} ({instructor.reviews} reviews)
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span>{instructor.experience} years experience</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <PoundSterling className="w-4 h-4 mr-2" />
            <span>£{instructor.price}/hour</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{instructor.phone}</span>
          </div>
        </div>
        <button className="w-full px-4 py-2 mt-4 text-white transition-colors bg-green-600 rounded-md hover:bg-green-700">
          Contact Instructor
        </button>
      </div>
    </div>
  );
}