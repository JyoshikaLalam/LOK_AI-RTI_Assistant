import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Plus,
  Bell,
  Download
} from 'lucide-react';
import { useRTI } from '../context/RTIContext';

export const Tracker: React.FC = () => {
  const { t } = useTranslation();
  const { state } = useRTI();
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'replied': return 'text-green-600 bg-green-100';
      case 'appeal': return 'text-blue-600 bg-blue-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'replied': return <CheckCircle className="h-4 w-4" />;
      case 'appeal': return <AlertCircle className="h-4 w-4" />;
      case 'closed': return <FileText className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getDaysRemaining = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('tracker.title')}</h1>
        <p className="text-xl text-gray-600">
          Monitor your RTI applications, track deadlines, and manage appeals.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {state.rtiApplications.filter(app => app.status === 'pending').length}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {state.rtiApplications.filter(app => app.status === 'replied').length}
              </p>
              <p className="text-gray-600">Replied</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {state.rtiApplications.filter(app => app.status === 'appeal').length}
              </p>
              <p className="text-gray-600">Appeals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Bell className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {state.rtiApplications.filter(app => {
                  const daysLeft = getDaysRemaining(app.dueDate);
                  return daysLeft <= 7 && daysLeft > 0 && app.status === 'pending';
                }).length}
              </p>
              <p className="text-gray-600">Due Soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>{t('tracker.addManual')}</span>
        </button>

        <div className="flex space-x-4">
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
            <Calendar className="h-5 w-5" />
            <span>Calendar View</span>
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
            <Download className="h-5 w-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* RTI Applications List */}
      <div className="bg-white rounded-2xl shadow-lg">
        {state.rtiApplications.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('tracker.noApplications')}</h3>
            <p className="text-gray-600 mb-6">
              Start by filing your first RTI application or add existing ones manually.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>{t('tracker.addManual')}</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-6 font-semibold text-gray-900">Subject</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Department</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Status</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Submitted</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Due Date</th>
                  <th className="text-left p-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {state.rtiApplications.map((application) => {
                  const daysLeft = getDaysRemaining(application.dueDate);
                  return (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="p-6">
                        <div className="font-medium text-gray-900">{application.subject}</div>
                        <div className="text-sm text-gray-500">ID: {application.id}</div>
                      </td>
                      <td className="p-6 text-gray-700">{application.department}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span>{t(`tracker.status.${application.status}`)}</span>
                        </span>
                      </td>
                      <td className="p-6 text-gray-700">
                        {application.submittedAt.toLocaleDateString()}
                      </td>
                      <td className="p-6">
                        <div className="text-gray-700">{application.dueDate.toLocaleDateString()}</div>
                        {application.status === 'pending' && (
                          <div className={`text-sm ${daysLeft > 7 ? 'text-green-600' : daysLeft > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                            {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                          </div>
                        )}
                      </td>
                      <td className="p-6">
                        <div className="flex space-x-2">
                          <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                            View
                          </button>
                          {application.status === 'pending' && daysLeft <= 0 && (
                            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
                              Appeal
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Manual Entry Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add RTI Application</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Brief description of your RTI"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Select Department</option>
                  <option>Revenue Department</option>
                  <option>Health & Family Welfare</option>
                  <option>Education Department</option>
                  <option>Public Works Department</option>
                  <option>Police Department</option>
                  <option>Municipal Corporation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Submission Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};