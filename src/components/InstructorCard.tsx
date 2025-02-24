import React from 'react';
import { Star, Clock, PoundSterling } from 'lucide-react';
import { Instructor } from '../types';

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{instructor.name}</h3>
        <div className="mt-2 flex items-center">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="ml-1 text-sm text-gray-600">
            {instructor.rating} ({instructor.reviews} reviews)
          </span>
        </div>
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>{instructor.experience} years experience</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <PoundSterling className="h-4 w-4 mr-2" />
            <span>£{instructor.price}/hour</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
          Contact Instructor
        </button>
      </div>
    </div>
  );
}