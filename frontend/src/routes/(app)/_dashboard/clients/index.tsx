import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@components/ui/button";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import AddClientDialog from "./-components/AddClientDialog";
import ClientTable from "./-components/ClientTable";

export const Route = createFileRoute("/(app)/_dashboard/clients/")({
  component: ClientsPage,
});

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
}

// Mock client data
const mockClients: Client[] = [
  {
    id: "1",
    firstName: "Emma",
    lastName: "Thompson",
    email: "emma.thompson@email.com",
    phone: "(555) 123-4567",
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Wilson",
    email: "james.wilson@email.com",
    phone: "(555) 234-5678",
  },
  {
    id: "3",
    firstName: "Sophia",
    lastName: "Garcia",
    email: "sophia.garcia@email.com",
    phone: "(555) 345-6789",
  },
  {
    id: "4",
    firstName: "Michael",
    lastName: "Chen",
    email: "michael.chen@email.com",
    phone: "(555) 456-7890",
  },
  {
    id: "5",
    firstName: "Isabella",
    lastName: "Martinez",
    email: "isabella.martinez@email.com",
    phone: "(555) 567-8901",
  },
];

function ClientsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const [clients] = React.useState<Client[]>(mockClients);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const filteredClients = clients.filter((client) => {
    const searchString = searchTerm.toLowerCase();
    return (
      client.firstName.toLowerCase().includes(searchString) ||
      client.lastName.toLowerCase().includes(searchString) ||
      client.email?.toLowerCase().includes(searchString) ||
      client.phone?.toLowerCase().includes(searchString)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredClients.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <AddClientDialog />
      </div>

      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm pl-8"
        />
      </div>

      <ClientTable clients={mockClients} />

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => {
              setRowsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={rowsPerPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
