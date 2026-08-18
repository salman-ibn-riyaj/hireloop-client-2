"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  Chip,
  Modal,
} from "@heroui/react";
import {
  FiBriefcase,
  FiGlobe,
  FiMapPin,
  FiUsers,
  FiUploadCloud,
  FiEdit,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const INDUSTRY_OPTIONS = [
  { key: "Technology", label: "Technology" },
  { key: "Finance", label: "Finance & Banking" },
  { key: "Healthcare", label: "Healthcare" },
  { key: "E-Commerce", label: "E-Commerce" },
  { key: "Education", label: "Education" },
];

const EMPLOYEE_RANGES = [
  { key: "1-10", label: "1-10 employees" },
  { key: "11-50", label: "11-50 employees" },
  { key: "51-200", label: "51-200 employees" },
  { key: "201-500", label: "201-500 employees" },
  { key: "500+", label: "500+ employees" },
];

export default function RecruiterCompanyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [company, setCompany] = useState({
    name: "Acme Corporation",
    website: "https://www.acme.com",
    industry: "Technology",
    location: "San Francisco, CA",
    employeeCount: "11-50",
    logo: "https://i.ibb.co/sample-logo.png",
    description: "Building next-generation solutions for modern software teams.",
    status: "Pending",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    website: "",
    industry: "",
    location: "",
    employeeCount: "",
    description: "",
  });

  const handleOpenRegister = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      website: "",
      industry: "",
      location: "",
      employeeCount: "",
      description: "",
    });
    setLogoPreview("");
    setLogoFile(null);
    setIsOpen(true);
  };

  const handleOpenEdit = () => {
    setIsEditing(true);
    setFormData({
      name: company.name,
      website: company.website,
      industry: company.industry,
      location: company.location,
      employeeCount: company.employeeCount,
      description: company.description,
    });
    setLogoPreview(company.logo);
    setIsOpen(true);
  };

  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    const bodyData = new FormData();
    bodyData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: bodyData,
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.data.url;
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalLogoUrl = company?.logo || "";

      if (logoFile) {
        setIsUploading(true);
        finalLogoUrl = await uploadToImgBB(logoFile);
        setIsUploading(false);
      }

      const updatedCompanyData = {
        ...formData,
        logo: finalLogoUrl,
        status: isEditing ? company.status : "Pending",
      };

      setCompany(updatedCompanyData);
      setIsOpen(false);
    } catch (err) {
      console.error("Error submitting company info:", err);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      console.log("Form Data Submitted:", { ...formData, logo: logoFile });
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <Chip color="success" variant="flat" startContent={<FiCheckCircle />}>
            Approved
          </Chip>
        );
      case "Rejected":
        return (
          <Chip color="danger" variant="flat" startContent={<FiXCircle />}>
            Rejected
          </Chip>
        );
      default:
        return (
          <Chip color="warning" variant="flat" startcontent={<FiClock />}>
            Pending Approval
          </Chip>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-zinc-100">
      {/* HEADER SECTION */}
      <div className="flex flex-col xs:flex-row sm:flex-row justify-between items-start xs:items-center sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Company Profile</h1>
        {company && (
          <Button
            color="primary"
            variant="solid"
            startContent={<FiEdit />}
            onPress={handleOpenEdit}
            className="w-full xs:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/30 transition-all duration-200"
          >
            Edit Company
          </Button>
        )}
      </div>

      {/* UNREGISTERED STATE */}
      {!company ? (
        <Card className="bg-zinc-900 border border-zinc-800 p-6 sm:p-10 text-center">
          <Card.Header className="flex flex-col items-center gap-4">
            <div className="p-3 sm:p-4 bg-zinc-800/60 rounded-full text-zinc-400">
              <FiBriefcase className="w-8 h-8 sm:w-12 sm:h-12" />
            </div>
            <Card.Title className="text-lg sm:text-xl font-semibold text-white">
              No Company Registered
            </Card.Title>
            <Card.Description className="text-sm sm:text-base text-zinc-400 max-w-md">
              You haven't set up a company profile yet. Register your company to start posting job listings and managing applicants.
            </Card.Description>
            <Button
              color="primary"
              size="lg"
              startContent={<FiPlus />}
              onPress={handleOpenRegister}
              className="w-full sm:w-auto font-medium mt-2"
            >
              Register Company
            </Button>
          </Card.Header>
        </Card>
      ) : (
        /* REGISTERED STATE */
        <Card className="bg-zinc-900 border border-zinc-800">
          <Card.Header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 gap-4 border-b border-zinc-800">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
              <img
                src={company.logo || "/placeholder-company.png"}
                alt={company.name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover bg-zinc-800 border border-zinc-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <Card.Title className="text-xl sm:text-2xl font-bold text-white truncate">
                  {company.name}
                </Card.Title>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-zinc-400 mt-1">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="shrink-0" /> {company.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMapPin className="shrink-0" /> {company.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="self-start sm:self-auto shrink-0">
              {renderStatusBadge(company.status)}
            </div>
          </Card.Header>

          <Card.Header className="p-4 sm:p-6 space-y-6 flex flex-col items-stretch border-none">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 p-3 bg-zinc-800/40 rounded-lg border border-zinc-800 min-w-0">
                <FiGlobe className="text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-500">Website</p>
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm text-blue-400 hover:underline truncate block"
                  >
                    {company.website}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-800/40 rounded-lg border border-zinc-800">
                <FiUsers className="text-zinc-400 shrink-0" />
                <div>
                  <p className="text-xs text-zinc-500">Company Size</p>
                  <p className="text-xs sm:text-sm font-medium">{company.employeeCount} employees</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                About the Company
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed break-words">
                {company.description}
              </p>
            </div>
          </Card.Header>
        </Card>
      )}

      {/* RESPONSIVE MODAL */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop className="p-2 sm:p-4 flex items-center justify-center">
          <Modal.Container className="w-full flex items-center justify-center">
            <Modal.Dialog className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-xl shadow-2xl overflow-hidden my-auto">
              <Modal.CloseTrigger />
              <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <Modal.Header className="flex flex-col gap-1 border-b border-zinc-800 p-4 sm:p-6 shrink-0">
                  <Modal.Heading className="text-base sm:text-lg font-semibold text-white">
                    {isEditing ? "Edit Company Details" : "Register New Company"}
                  </Modal.Heading>
                  <p className="text-xs font-normal text-zinc-400">
                    Enter your business details to start hiring on HireLoop.
                  </p>
                </Modal.Header>

                {/* Modal Body with Vertical Scroll for Small Viewports */}
                <Modal.Body className="gap-4 p-4 sm:p-6 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] grow">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-300">Company Name</Label>
                      <Input
                        placeholder="e.g. Acme Corp"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-lg px-3 py-2 text-sm w-full"
                        required
                      />
                    </div>

                    {/* Industry */}
                    <div className="flex flex-col gap-1.5">
                      <Select className="w-full" placeholder="Select Industry">
                        <Label className="text-xs font-medium text-zinc-300">Industry / Category</Label>
                        <Select.Trigger className="w-full bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-lg px-3 py-2 flex items-center justify-between text-sm">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl z-50 max-h-48 overflow-y-auto">
                          <ListBox
                            aria-label="Select Industry"
                            selectedKeys={formData.industry ? [formData.industry] : []}
                            onSelectionChange={(keys) => {
                              const key = Array.from(keys)[0];
                              setFormData({ ...formData, industry: String(key || "") });
                            }}
                          >
                            {INDUSTRY_OPTIONS.map((item) => (
                              <ListBox.Item
                                key={item.key}
                                id={item.key}
                                textValue={item.label}
                                className="p-2 text-sm rounded hover:bg-zinc-800 cursor-pointer flex items-center justify-between text-zinc-200"
                              >
                                {item.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Website URL */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-300">Website URL</Label>
                      <div className="flex items-center bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500 rounded-lg px-3 py-2">
                        <span className="text-zinc-500 text-sm mr-1 shrink-0">https://</span>
                        <Input
                          placeholder="www.company.com"
                          value={formData.website.replace(/^https?:\/\//, "")}
                          onChange={(e) => setFormData({ ...formData, website: `https://${e.target.value}` })}
                          className="bg-transparent border-none p-0 text-sm focus:outline-none w-full min-w-0"
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-300">Location</Label>
                      <div className="flex items-center gap-2 bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus-within:border-zinc-500 rounded-lg px-3 py-2">
                        <FiMapPin className="text-zinc-500 shrink-0" />
                        <Input
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-transparent border-none p-0 text-sm focus:outline-none w-full min-w-0"
                        />
                      </div>
                    </div>

                    {/* Employee Count */}
                    <div className="flex flex-col gap-1.5">
                      <Select className="w-full" placeholder="Select Size">
                        <Label className="text-xs font-medium text-zinc-300">Employee Count Range</Label>
                        <Select.Trigger className="w-full bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-lg px-3 py-2 flex items-center justify-between text-sm">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-lg p-1 shadow-xl z-50 max-h-48 overflow-y-auto">
                          <ListBox
                            aria-label="Employee Count Range"
                            selectedKeys={formData.employeeCount ? [formData.employeeCount] : []}
                            onSelectionChange={(keys) => {
                              const key = Array.from(keys)[0];
                              setFormData({ ...formData, employeeCount: String(key || "") });
                            }}
                          >
                            {EMPLOYEE_RANGES.map((item) => (
                              <ListBox.Item
                                key={item.key}
                                id={item.key}
                                textValue={item.label}
                                className="p-2 text-sm rounded hover:bg-zinc-800 cursor-pointer flex items-center justify-between text-zinc-200"
                              >
                                {item.label}
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Company Logo Upload */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-xs font-medium text-zinc-300">Company Logo</Label>
                      <label className="flex items-center gap-3 p-2.5 bg-zinc-800/50 border border-dashed border-zinc-700 rounded-lg cursor-pointer hover:border-zinc-500 transition-colors">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-10 h-10 rounded object-cover shrink-0" />
                        ) : (
                          <div className="p-2 bg-zinc-800 rounded text-zinc-400 shrink-0">
                            <FiUploadCloud size={18} />
                          </div>
                        )}
                        <div className="text-xs min-w-0">
                          <p className="font-medium text-zinc-200 truncate">
                            {logoFile ? logoFile.name : "Upload image"}
                          </p>
                          <p className="text-zinc-500">PNG, JPG up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Brief Description */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <Label className="text-xs font-medium text-zinc-300">Brief Description</Label>
                    <TextArea
                      placeholder="Tell us about your company's mission and culture..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 focus:border-zinc-500 rounded-lg px-3 py-2 text-sm w-full min-h-[90px]"
                    />
                  </div>
                </Modal.Body>

                {/* Modal Footer */}
                <Modal.Footer className="border-t border-zinc-800 p-4 sm:p-6 flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 shrink-0">
                  <Button
                    variant="flat"
                    onPress={() => setIsOpen(false)}
                    className="w-full sm:w-auto bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting || isUploading}
                    className="w-full sm:w-auto bg-white text-black font-semibold hover:bg-zinc-200"
                  >
                    {isEditing ? "Save Changes" : "Register Company"}
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}