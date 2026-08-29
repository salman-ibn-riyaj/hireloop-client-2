"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Input,
  Select,
  ListBox,
  Checkbox,
  Button,
  Label,
} from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { useState, useTransition } from "react";

const CATEGORIES = [
  { id: "customer-service", label: "Customer Service" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
];

const JOB_TYPES = [
  { id: "full-time", label: "Full Time" },
  { id: "part-time", label: "Part Time" },
  { id: "contract", label: "Contract" },
  { id: "internship", label: "Internship" },
];

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [isRemote, setIsRemote] = useState(searchParams.get("isRemote") === "true");

  const applyFilters = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === false) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setType("");
    setIsRemote(false);
    startTransition(() => {
      router.push(pathname);
    });
  };

  return (
    <div className="bg-content1 rounded-2xl p-4 shadow-sm border border-default-100 mb-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
        {/* Search Field */}
        <div className="flex flex-col gap-1">
          <Label className="text-xs font-medium text-default-600">Search</Label>
          <Input
            aria-label="Search jobs"
            className="w-full"
            placeholder="Title, company, location..."
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              applyFilters({ search: val });
            }}
          />
        </div>

        {/* Category Select Component */}
        <Select
          className="w-full"
          placeholder="Select category"
          selectedKey={category || null}
          onSelectionChange={(key) => {
            const selectedVal = key ? String(key) : "";
            setCategory(selectedVal);
            applyFilters({ category: selectedVal });
          }}
        >
          <Label className="text-xs font-medium text-default-600">Category</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {CATEGORIES.map((cat) => (
                <ListBox.Item key={cat.id} id={cat.id} textValue={cat.label}>
                  {cat.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Job Type Select Component */}
        <Select
          className="w-full"
          placeholder="Select job type"
          selectedKey={type || null}
          onSelectionChange={(key) => {
            const selectedVal = key ? String(key) : "";
            setType(selectedVal);
            applyFilters({ type: selectedVal });
          }}
        >
          <Label className="text-xs font-medium text-default-600">Job Type</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {JOB_TYPES.map((t) => (
                <ListBox.Item key={t.id} id={t.id} textValue={t.label}>
                  {t.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Remote Checkbox & Reset Button */}
        <div className="flex items-center justify-between gap-2 h-10 px-1">
          <Checkbox
            isSelected={isRemote}
            onValueChange={(checked) => {
              setIsRemote(checked);
              applyFilters({ isRemote: checked });
            }}
          >
            Remote Only
          </Checkbox>

          <Button
            size="sm"
            variant="flat"
            color="default"
            startContent={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={handleReset}
            isDisabled={isPending}
          >
            Reset
          </Button>
        </div>

      </div>
    </div>
  );
}