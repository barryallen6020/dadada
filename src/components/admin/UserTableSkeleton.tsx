import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const UserTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-white/10 hover:bg-white/20">
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Preferred Hub</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((index) => (
          <TableRow key={index} className="hover:bg-white/10">
            <TableCell><Skeleton className="h-4 w-[140px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[180px]" /></TableCell>
            <TableCell><Skeleton className="h-6 w-[100px] rounded-full" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[160px]" /></TableCell>
            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
            <TableCell><Skeleton className="h-6 w-[80px] rounded-full" /></TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTableSkeleton; 