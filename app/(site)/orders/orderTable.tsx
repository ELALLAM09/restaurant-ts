"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteOrder } from "@/actions/deleteOrders";
import { updateOrder } from "@/actions/updateOrder";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@prisma/client";

dayjs.extend(relativeTime);

const OrderTable = ({ orders }: { orders: OrderItem[] | undefined }) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Table>
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">N° Table</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status </TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders &&
          orders.map((item: OrderItem) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.numberTable}</TableCell>
              <TableCell className="flex justify-between">
                <span>{item.prodTitle}</span>
                <span className="block text-green-500">({item.qty})</span>
              </TableCell>
              <TableCell>${item.prodPrice}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{dayjs(item.createdAt).fromNow()}</TableCell>
              <TableCell className="text-end">
                {item.status === "DONE" ? (
                  <Button
                    onClick={() => deleteOrder(item.id)}
                    className="text-red-500"
                    size="sm"
                    variant="link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={async () => {
                      setLoading(true);
                      await updateOrder(item);
                      setLoading(false);
                    }}
                  >
                    {loading ? "loading..." : "Done"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
