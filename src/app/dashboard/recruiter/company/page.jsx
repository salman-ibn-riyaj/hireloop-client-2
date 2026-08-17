'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  Image,
  Spinner,
  Chip,
  Tooltip,
} from '@heroui/react';
import {
  FiBuilding,
  FiMapPin,
  FiUsers,
  FiBriefcase,
  FiGlobe,
  FiUpload,
  FiX,
  FiEdit2,
  FiPlus,
  FiExternalLink,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from 'react-icons/fi';

// Constants
const INDUSTRIES = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Education', label: 'Education' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Media', label: 'Media & Entertainment' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Nonprofit', label: 'Nonprofit' },
  { value: 'Other', label: 'Other' },
];

const EMPLOYEE_RANGES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

const STATUS_CONFIG = {
  pending: {
    icon: FiClock,
    label: 'Pending Review',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  approved: {
    icon: FiCheckCircle,
    label: 'Approved',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  rejected: {
    icon: FiXCircle,
    label: 'Rejected',
    className: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
};

// Status Badge Component
const CompanyStatusBadge = ({ status, rejectionReason }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = config.icon;

  return (
    <Tooltip
      content={
        <div className="px-1 py-0.5">
          <p className="text-xs font-medium">{config.label}</p>
          {status === 'rejected' && rejectionReason && (
            <p className="text-xs text-rose-400 mt-1">Reason: {rejectionReason}</p>
          )}
        </div>
      }
      className="bg-zinc-800 border border-zinc-700 text-zinc-100"
    >
      <Chip
        size="sm"
        variant="flat"
        className={config.className}
        startContent={<Icon className="w-3.5 h-3.5" />}
      >
        {config.label}
      </Chip>
    </Tooltip>
  );
};

// Main Component
const RecruiterCompany = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  // States
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    website: '',
    location: '',
    employeeCount: '',
    description: '',
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Mock fetch - Replace with your actual API call
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        // const result = await getCompany();
        // if (result.success) {
        //   setCompany(result.data);
        // }
        
        // Mock data - remove this in production
        setTimeout(() => {
          // Set to null to show empty state, or uncomment below to show company details
          setCompany(null);
          // setCompany({
          //   name: 'Acme Corp',
          //   industry: 'Technology',
          //   website: 'https://acme.com',
          //   location: 'San Francisco, CA',
          //   employeeCount: '51-200',
          //   description: 'Building the future of work with innovative solutions.',
          //   logo: null,
          //   status: 'pending',
          //   createdAt: new Date().toISOString(),
          //   updatedAt: new Date().toISOString(),
          // });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load company data');
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  // Handle form input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle logo upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setFormErrors(prev => ({ ...prev, logo: 'PNG, JPG or GIF up to 5MB' }));
      return;
    }

    if (file.size > maxSize) {
      setFormErrors(prev => ({ ...prev, logo: 'PNG, JPG or GIF up to 5MB' }));
      return;
    }

    setLogoFile(file);
    setFormErrors(prev => ({ ...prev, logo: undefined }));
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name?.trim()) errors.name = 'Company name is required';
    if (!formData.industry) errors.industry = 'Industry is required';
    if (!formData.location?.trim()) errors.location = 'Location is required';
    if (!formData.employeeCount) errors.employeeCount = 'Employee count is required';
    if (!formData.description?.trim()) errors.description = 'Description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    
    // Prepare form data
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) submitData.append(key, formData[key]);
    });
    if (logoFile) submitData.append('logoFile', logoFile);

    try {
      // Replace with your actual API call
      // const result = await saveCompany(submitData);
      // if (result.success) {
      //   setCompany(result.data);
      //   setIsEditing(false);
      //   router.refresh();
      // }
      
      // Mock success
      console.log('Submitting:', Object.fromEntries(submitData));
      setTimeout(() => {
        setCompany({
          ...formData,
          logo: logoPreview,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        setIsEditing(false);
        setSubmitting(false);
      }, 1000);
    } catch (error) {
      setFormErrors({ general: 'Failed to save company' });
      setSubmitting(false);
    }
  };

  // Handle edit
  const handleEdit = () => {
    if (company) {
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        website: company.website || '',
        location: company.location || '',
        employeeCount: company.employeeCount || '',
        description: company.description || '',
      });
      setLogoPreview(company.logo || null);
    }
    setIsEditing(true);
  };

  // Handle cancel
  const handleCancel = () => {
    setIsEditing(false);
    setFormErrors({});
    if (company) {
      setFormData({
        name: company.name || '',
        industry: company.industry || '',
        website: company.website || '',
        location: company.location || '',
        employeeCount: company.employeeCount || '',
        description: company.description || '',
      });
      setLogoPreview(company.logo || null);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-zinc-800 rounded" />
          <div className="h-64 bg-zinc-800/50 rounded-xl" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-zinc-900/50 border border-zinc-800">
          <div className="p-6 py-12 text-center">
            <FiAlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Something went wrong</h3>
            <p className="text-sm text-zinc-400">{error}</p>
          </div>
        </Card>
      </div>
    );
  }

  // ============================================
  // EMPTY STATE - No Company Registered
  // ============================================
  if (!company && !isEditing) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-zinc-900/60 border border-zinc-800 shadow-xl">
          <div className="p-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <FiBuilding className="w-10 h-10 text-zinc-500" />
            </div>
            
            <h3 className="text-xl font-semibold text-zinc-100 mb-2">
              No Company Registered
            </h3>
            
            <p className="text-sm text-zinc-400 max-w-md mx-auto mb-8">
              Get started by registering your company. This information will be 
              displayed to job seekers when you post job openings.
            </p>

            <Button
              onPress={() => setIsEditing(true)}
              startContent={<FiPlus className="w-4 h-4" />}
              className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold"
            >
              Register Company
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // ============================================
  // EDIT MODE - Register/Edit Form
  // ============================================
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-100">
            {company ? 'Edit Company' : 'Register New Company'}
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            {company 
              ? 'Update your company information' 
              : 'Enter your business details to start hiring on HireLoop.'}
          </p>
        </div>

        <Card className="bg-zinc-900/60 border border-zinc-800 shadow-xl">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Company Name */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Company Name
                </label>
                <Input
                  placeholder="e.g. Acme Corp"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  isInvalid={!!formErrors.name}
                  errorMessage={formErrors.name}
                  variant="bordered"
                  classNames={{
                    input: 'text-zinc-100',
                    inputWrapper: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                  }}
                />
              </div>

              {/* Industry */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Industry / Category
                </label>
                <Select
                  placeholder="Select industry"
                  selectedKeys={formData.industry ? [formData.industry] : []}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  isInvalid={!!formErrors.industry}
                  errorMessage={formErrors.industry}
                  variant="bordered"
                  classNames={{
                    trigger: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                    value: 'text-zinc-100',
                    popover: 'bg-zinc-900 border border-zinc-800',
                  }}
                >
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value} className="hover:bg-zinc-800 rounded-lg">
                      {ind.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Website */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Website URL
                </label>
                <Input
                  placeholder="https://www.company.com"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  variant="bordered"
                  classNames={{
                    input: 'text-zinc-100',
                    inputWrapper: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                  }}
                  startContent={<FiGlobe className="w-4 h-4 text-zinc-500" />}
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Location
                </label>
                <Input
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  isInvalid={!!formErrors.location}
                  errorMessage={formErrors.location}
                  variant="bordered"
                  classNames={{
                    input: 'text-zinc-100',
                    inputWrapper: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                  }}
                  startContent={<FiMapPin className="w-4 h-4 text-zinc-500" />}
                />
              </div>

              {/* Employee Count */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Employee Count Range
                </label>
                <Select
                  placeholder="Select employee count"
                  selectedKeys={formData.employeeCount ? [formData.employeeCount] : []}
                  onChange={(e) => handleChange('employeeCount', e.target.value)}
                  isInvalid={!!formErrors.employeeCount}
                  errorMessage={formErrors.employeeCount}
                  variant="bordered"
                  classNames={{
                    trigger: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                    value: 'text-zinc-100',
                    popover: 'bg-zinc-900 border border-zinc-800',
                  }}
                  startContent={<FiUsers className="w-4 h-4 text-zinc-500" />}
                >
                  {EMPLOYEE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value} className="hover:bg-zinc-800 rounded-lg">
                      {range.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Logo */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Company Logo
                </label>
                <div className="flex items-center gap-4">
                  {logoPreview ? (
                    <div className="relative">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-16 h-16 object-contain rounded-lg border border-zinc-700 bg-zinc-900"
                      />
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-1.5 -right-1.5 p-1 bg-rose-500 rounded-full hover:bg-rose-600 transition-colors"
                      >
                        <FiX className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex items-center justify-center">
                      <FiBuilding className="w-6 h-6 text-zinc-600" />
                    </div>
                  )}
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="bordered"
                      onPress={() => fileInputRef.current?.click()}
                      className="bg-zinc-900/50 border-zinc-700 text-zinc-300"
                      startContent={<FiUpload className="w-4 h-4" />}
                    >
                      Upload image
                    </Button>
                    <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
                    {formErrors.logo && (
                      <p className="text-xs text-rose-400 mt-1">{formErrors.logo}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-zinc-300 block mb-1.5">
                  Brief Description
                </label>
                <Textarea
                  placeholder="Tell us about your company's mission and culture..."
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  isInvalid={!!formErrors.description}
                  errorMessage={formErrors.description}
                  minRows={3}
                  maxRows={6}
                  variant="bordered"
                  classNames={{
                    input: 'text-zinc-100',
                    inputWrapper: 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600',
                  }}
                />
              </div>

              {/* General Error */}
              {formErrors.general && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                  <p className="text-xs text-rose-400">{formErrors.general}</p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-zinc-800/80">
                <Button
                  type="button"
                  variant="flat"
                  onPress={handleCancel}
                  className="flex-1 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  isLoading={submitting}
                  spinner={<Spinner size="sm" color="white" />}
                  className="flex-[2] bg-white hover:bg-zinc-200 text-zinc-950 font-semibold"
                >
                  {submitting ? 'Saving...' : company ? 'Update Company' : 'Register Company'}
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  // ============================================
  // VIEW MODE - Show Company Details
  // ============================================
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">My Company</h1>
          <p className="text-sm text-zinc-400 mt-1">View and manage your company profile</p>
        </div>
        <Button
          onPress={handleEdit}
          startContent={<FiEdit2 className="w-4 h-4" />}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
        >
          Edit Company
        </Button>
      </div>

      <Card className="bg-zinc-900/60 border border-zinc-800 shadow-xl">
        <div className="p-6 md:p-8">
          {/* Header with Logo */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo */}
            <div className="flex-shrink-0">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-xl border border-zinc-700 bg-zinc-900"
                />
              ) : (
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 flex items-center justify-center">
                  <FiBuilding className="w-12 h-12 text-zinc-600" />
                </div>
              )}
            </div>

            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 truncate">
                    {company.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-zinc-800 text-zinc-300 border-zinc-700"
                      startContent={<FiBriefcase className="w-3 h-3" />}
                    >
                      {company.industry}
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-zinc-800 text-zinc-300 border-zinc-700"
                      startContent={<FiUsers className="w-3 h-3" />}
                    >
                      {company.employeeCount}
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      className="bg-zinc-800 text-zinc-300 border-zinc-700"
                      startContent={<FiMapPin className="w-3 h-3" />}
                    >
                      {company.location}
                    </Chip>
                  </div>
                </div>
                <CompanyStatusBadge status={company.status} rejectionReason={company.rejectionReason} />
              </div>
            </div>
          </div>

          <hr className="border-zinc-800/80 my-6" />

          {/* Company Details */}
          <div className="space-y-4">
            {company.website && (
              <div>
                <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <FiGlobe className="w-3.5 h-3.5" />
                  Website
                </p>
                <a
                  href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  {company.website}
                  <FiExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                <FiBriefcase className="w-3.5 h-3.5" />
                About
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap mt-1">
                {company.description}
              </p>
            </div>
          </div>

          <hr className="border-zinc-800/80 my-6" />

          {/* Metadata */}
          <div className="flex flex-wrap gap-6 text-xs text-zinc-500">
            <div>
              <span className="font-medium">Created:</span>{' '}
              {new Date(company.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            {company.updatedAt && (
              <div>
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(company.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RecruiterCompany;