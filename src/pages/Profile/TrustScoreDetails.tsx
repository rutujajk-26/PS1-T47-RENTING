import { Shield, Check, AlertTriangle, Info, Plus } from 'lucide-react';

interface TrustScoreDetailsProps {
  score: number;
}

interface TrustFactorProps {
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'locked';
  points: number;
  pointsEarned: number;
  icon: React.ReactNode;
}

const TrustFactor = ({ title, description, status, points, pointsEarned, icon }: TrustFactorProps) => {
  return (
    <div className={`
      border rounded-lg p-4
      ${status === 'completed' ? 'border-green-200 bg-green-50' :
        status === 'pending' ? 'border-yellow-200 bg-yellow-50' :
        'border-gray-200 bg-gray-50'}
    `}>
      <div className="flex items-start">
        <div className={`
          w-10 h-10 rounded-full flex items-center justify-center mr-3
          ${status === 'completed' ? 'bg-green-500 text-white' :
            status === 'pending' ? 'bg-yellow-500 text-white' :
            'bg-gray-300 text-white'}
        `}>
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{title}</h3>
            <div className="text-right">
              <span className="font-medium">{pointsEarned}/{points}</span>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          
          {status === 'completed' ? (
            <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-green-100 text-green-800">
              <Check size={12} className="mr-1" />
              Completed
            </span>
          ) : status === 'pending' ? (
            <button className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
              <Plus size={12} className="mr-1" />
              Complete Now
            </button>
          ) : (
            <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-gray-100 text-gray-800">
              <AlertTriangle size={12} className="mr-1" />
              Locked
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const TrustScoreDetails = ({ score }: TrustScoreDetailsProps) => {
  const trustFactors: TrustFactorProps[] = [
    {
      title: 'Identity Verification',
      description: 'Verify your identity with government-issued ID',
      status: 'completed',
      points: 2,
      pointsEarned: 2,
      icon: <Check size={20} />
    },
    {
      title: 'Phone Verification',
      description: 'Verify your phone number',
      status: 'completed',
      points: 1,
      pointsEarned: 1,
      icon: <Check size={20} />
    },
    {
      title: 'Email Verification',
      description: 'Verify your email address',
      status: 'completed',
      points: 1,
      pointsEarned: 1,
      icon: <Check size={20} />
    },
    {
      title: 'Successful Rentals',
      description: 'Complete rental transactions without issues',
      status: 'completed',
      points: 3,
      pointsEarned: 3,
      icon: <Check size={20} />
    },
    {
      title: 'Payment Method',
      description: 'Add a valid payment method to your account',
      status: 'pending',
      points: 1,
      pointsEarned: 0,
      icon: <AlertTriangle size={20} />
    },
    {
      title: 'Social Media Verification',
      description: 'Connect your social media accounts',
      status: 'locked',
      points: 2,
      pointsEarned: 0,
      icon: <Info size={20} />
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Trust Score</h2>
        <p className="text-gray-600">Build your trust score to access premium features and better rates</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-center p-6 mb-6 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg text-white">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Shield size={24} className="mr-2" />
              <h3 className="text-xl font-bold">Your Trust Score</h3>
            </div>
            <div className="text-4xl font-bold mb-2">{score}/10</div>
            <p>Good standing</p>
            
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2.5 mt-4">
              <div className="bg-white h-2.5 rounded-full" style={{ width: `${score * 10}%` }}></div>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Trust Factors</h3>
        <div className="space-y-4">
          {trustFactors.map((factor, index) => (
            <TrustFactor key={index} {...factor} />
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mt-6">
          <h3 className="font-medium flex items-center">
            <Info size={18} className="mr-2 text-teal-600" />
            How Trust Score Works
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Your trust score is calculated based on your activity and verified information on the platform. 
            A higher trust score gives you access to premium items, better rental rates, and 
            increases your chances of being approved for rentals by owners.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustScoreDetails;