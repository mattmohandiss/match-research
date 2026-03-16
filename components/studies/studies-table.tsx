"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { StudyWithCreator } from "@/lib/types";

interface StudiesTableProps {
  studies: StudyWithCreator[];
  itemsPerPage?: number;
}

export function StudiesTable({ studies, itemsPerPage = 10 }: StudiesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(studies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudies = studies.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Study Name</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Study Information, Procedure</TableHead>
              <TableHead className="font-semibold">Research Impact</TableHead>
              <TableHead className="font-semibold">Time Commitment</TableHead>
              <TableHead className="font-semibold">Compensation in BDT</TableHead>
              <TableHead className="font-semibold">Survey Link / Meeting Schedule</TableHead>
              <TableHead className="font-semibold">Keywords</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentStudies.map((study, index) => (
              <TableRow
                key={study.id}
                className={`cursor-pointer ${index % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
              >
                <TableCell className="font-medium max-w-[200px]">
                  <Link
                    href={`/studies/${study.id}`}
                    className="hover:underline block"
                  >
                    {study.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/studies/${study.id}`} className="block">
                    {study.participant_role || "—"}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <Link
                    href={`/studies/${study.id}`}
                    className="block text-muted-foreground line-clamp-3"
                  >
                    {study.description}
                  </Link>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <Link
                    href={`/studies/${study.id}`}
                    className="block text-muted-foreground line-clamp-2"
                  >
                    {study.research_impact || "—"}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/studies/${study.id}`} className="block">
                    {study.duration_minutes
                      ? `${study.duration_minutes} min`
                      : "—"}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/studies/${study.id}`} className="block">
                    {study.payment_bdt
                      ? `${study.payment_bdt.toLocaleString()} BDT`
                      : "—"}
                  </Link>
                </TableCell>
                <TableCell>
                  {study.survey_link ? (
                    <a
                      href={study.survey_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Link
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <Link href={`/studies/${study.id}`} className="block">
                    {study.keywords && study.keywords.length > 0 ? (
                      <span className="text-sm text-muted-foreground">
                        {study.keywords.join(", ")}
                      </span>
                    ) : (
                      "—"
                    )}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "ghost"}
              size="sm"
              onClick={() => goToPage(page)}
              className="min-w-[36px]"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
