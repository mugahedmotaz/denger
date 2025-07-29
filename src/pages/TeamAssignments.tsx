import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import { Users, Truck, RotateCcw, Save, Zap } from 'lucide-react';
import { mockUsers, mockVehicles } from '../data/mockData';
import { User, Vehicle } from '../types';
import toast from 'react-hot-toast';

interface DraggablePersonProps {
  person: User;
  isAssigned?: boolean;
}

const DraggablePerson: React.FC<DraggablePersonProps> = ({ person, isAssigned }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: person.id,
    data: person,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white p-3 rounded-lg border-2 border-gray-200 cursor-grab active:cursor-grabbing
        hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md
        ${isDragging ? 'opacity-50 rotate-3 scale-105' : ''}
        ${isAssigned ? 'opacity-60 bg-gray-50' : ''}
      `}
    >
      <div className="flex items-center space-x-3 space-x-reverse">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {person.name.charAt(0)}
        </div>
        <div className="flex-1 text-right">
          <div className="font-medium text-gray-900">{person.name}</div>
          <div className="text-sm text-gray-500">
            {person.role === 'driver' ? 'سائق' : 'رجل إطفاء'}
          </div>
        </div>
        <div className={`
          w-3 h-3 rounded-full
          ${person.role === 'driver' ? 'bg-green-500' : 'bg-red-500'}
        `}></div>
      </div>
    </div>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
  assignedPersons: User[];
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, assignedPersons }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: vehicle.id,
  });

  const driver = assignedPersons.find(p => p.role === 'driver');
  const firefighters = assignedPersons.filter(p => p.role === 'firefighter');

  const getStatusColor = () => {
    switch (vehicle.status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'out_of_service': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = () => {
    switch (vehicle.status) {
      case 'active': return 'نشطة';
      case 'maintenance': return 'صيانة';
      case 'out_of_service': return 'خارج الخدمة';
      default: return 'غير محدد';
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`
        bg-white rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-xl
        ${isOver ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-200'}
        ${vehicle.status === 'out_of_service' ? 'opacity-60' : ''}
      `}
    >
      {/* Vehicle Header */}
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`عربة ${vehicle.number}`}
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full">
          <span className="font-bold">#{vehicle.number}</span>
        </div>
      </div>

      {/* Assignment Slots */}
      <div className="p-4 space-y-3">
        {/* Driver Slot */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 min-h-[60px] flex items-center justify-center">
          {driver ? (
            <div className="flex items-center space-x-2 space-x-reverse bg-green-50 p-2 rounded-lg border border-green-200 w-full">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {driver.name.charAt(0)}
              </div>
              <div className="flex-1 text-right">
                <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                <div className="text-xs text-green-600">سائق</div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Truck className="w-6 h-6 mx-auto mb-1" />
              <div className="text-xs">اسحب السائق هنا</div>
            </div>
          )}
        </div>

        {/* Firefighters Slots */}
        <div className="grid grid-cols-2 gap-2">
          {[0, 1].map((index) => {
            const firefighter = firefighters[index];
            return (
              <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-2 min-h-[60px] flex items-center justify-center">
                {firefighter ? (
                  <div className="flex items-center space-x-2 space-x-reverse bg-red-50 p-2 rounded-lg border border-red-200 w-full">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {firefighter.name.charAt(0)}
                    </div>
                    <div className="flex-1 text-right">
                      <div className="text-xs font-medium text-gray-900">{firefighter.name.split(' ')[0]}</div>
                      <div className="text-xs text-red-600">إطفائي</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <Users className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">إطفائي {index + 1}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const TeamAssignments: React.FC = () => {
  
  const [availablePeople] = useState<User[]>(
    mockUsers.filter(u => u.role === 'driver' || u.role === 'firefighter')
  );
  const [assignments, setAssignments] = useState<{ [vehicleId: string]: User[] }>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const vehicleId = over.id as string;
    const personId = active.id as string;
    const person = availablePeople.find(p => p.id === personId);

    if (!person || !mockVehicles.find(v => v.id === vehicleId)) return;

    // Check if vehicle is out of service
    const vehicle = mockVehicles.find(v => v.id === vehicleId);
    if (vehicle?.status === 'out_of_service') {
      toast.error('لا يمكن تعيين فريق لعربة خارج الخدمة');
      return;
    }

    setAssignments(prev => {
      const currentAssignments = prev[vehicleId] || [];
      const existingDrivers = currentAssignments.filter(p => p.role === 'driver');
      const existingFirefighters = currentAssignments.filter(p => p.role === 'firefighter');

      // Check if person is already assigned to this vehicle
      if (currentAssignments.some(p => p.id === personId)) {
        toast.info('هذا الشخص مُعيَّن بالفعل لهذه العربة');
        return prev;
      }

      // Check if person is assigned to another vehicle
      const isAssignedElsewhere = Object.values(prev).some(assignments =>
        assignments.some(p => p.id === personId)
      );
      if (isAssignedElsewhere) {
        toast.error('هذا الشخص مُعيَّن بالفعل لعربة أخرى');
        return prev;
      }

      // Check assignment rules
      if (person.role === 'driver' && existingDrivers.length >= 1) {
        toast.error('كل عربة تحتاج سائق واحد فقط');
        return prev;
      }

      if (person.role === 'firefighter' && existingFirefighters.length >= 2) {
        toast.error('كل عربة تحتاج إطفائيين اثنين كحد أقصى');
        return prev;
      }

      const newAssignments = [...currentAssignments, person];
      toast.success(`تم تعيين ${person.name} للعربة رقم ${vehicle?.number}`);

      return {
        ...prev,
        [vehicleId]: newAssignments
      };
    });
  };

  const generateAutoAssignments = () => {
    const newAssignments: { [vehicleId: string]: User[] } = {};
    const availableDrivers = [...availablePeople.filter(p => p.role === 'driver')];
    const availableFirefighters = [...availablePeople.filter(p => p.role === 'firefighter')];

    const activeVehicles = mockVehicles.filter(v => v.status === 'active');

    activeVehicles.forEach(vehicle => {
      const vehicleAssignments: User[] = [];

      // Assign one driver
      if (availableDrivers.length > 0) {
        const driver = availableDrivers.shift()!;
        vehicleAssignments.push(driver);
      }

      // Assign two firefighters
      for (let i = 0; i < 2 && availableFirefighters.length > 0; i++) {
        const firefighter = availableFirefighters.shift()!;
        vehicleAssignments.push(firefighter);
      }

      if (vehicleAssignments.length > 0) {
        newAssignments[vehicle.id] = vehicleAssignments;
      }
    });

    setAssignments(newAssignments);
    toast.success('تم التوليد التلقائي للتعيينات');
  };

  const clearAllAssignments = () => {
    setAssignments({});
    toast.success('تم مسح جميع التعيينات');
  };

  const saveAssignments = () => {
    // Here you would send the assignments to the backend
    console.log('Saving assignments:', assignments);
    toast.success('تم حفظ التوزيع بنجاح');

    // Send notifications to assigned personnel
    Object.entries(assignments).forEach(([vehicleId, people]) => {
      const vehicle = mockVehicles.find(v => v.id === vehicleId);
      people.forEach(person => {
        // In a real app, this would send actual notifications
        console.log(`إشعار إلى ${person.name}: تم تعيينك للعربة رقم ${vehicle?.number}`);
      });
    });
  };

  const getAssignedPersons = (vehicleId: string): User[] => {
    return assignments[vehicleId] || [];
  };

  const isPersonAssigned = (personId: string): boolean => {
    return Object.values(assignments).some(assignments =>
      assignments.some(p => p.id === personId)
    );
  };

  const activePerson = activeId ? availablePeople.find(p => p.id === activeId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">تعيين الفرق للعربات</h1>
            <p className="text-gray-600">اسحب وأفلت أعضاء الفريق إلى العربات المناسبة</p>
          </div>
          <div className="flex space-x-3 space-x-reverse">
            <button
              onClick={clearAllAssignments}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>مسح الكل</span>
            </button>
            <button
              onClick={generateAutoAssignments}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>توليد تلقائي</span>
            </button>
            <button
              onClick={saveAssignments}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التوزيع</span>
            </button>
          </div>
        </div>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Available Personnel */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-blue-100/30">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2 space-x-reverse">
              <Users className="w-5 h-5 text-blue-600" />
              <span>الأفراد المتاحون</span>
            </h2>

            {/* Drivers */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">السائقون</h3>
              <div className="space-y-2">
                {availablePeople
                  .filter(person => person.role === 'driver')
                  .map(person => (
                    <DraggablePerson
                      key={person.id}
                      person={person}
                      isAssigned={isPersonAssigned(person.id)}
                    />
                  ))}
              </div>
            </div>

            {/* Firefighters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">رجال الإطفاء</h3>
              <div className="space-y-2">
                {availablePeople
                  .filter(person => person.role === 'firefighter')
                  .map(person => (
                    <DraggablePerson
                      key={person.id}
                      person={person}
                      isAssigned={isPersonAssigned(person.id)}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockVehicles.map(vehicle => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  assignedPersons={getAssignedPersons(vehicle.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Drag Overlay */}
        <DragOverlay>
          {activePerson ? (
            <div className="bg-white p-3 rounded-lg border-2 border-blue-300 shadow-xl opacity-90 transform rotate-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {activePerson.name.charAt(0)}
                </div>
                <div className="flex-1 text-right">
                  <div className="font-medium text-gray-900">{activePerson.name}</div>
                  <div className="text-sm text-gray-500">
                    {activePerson.role === 'driver' ? 'سائق' : 'رجل إطفاء'}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TeamAssignments;