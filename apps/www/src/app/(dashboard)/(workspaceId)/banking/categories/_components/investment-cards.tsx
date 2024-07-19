import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { ChevronRight } from "lucide-react";

import { Badge } from "@dingify/ui/components/badge";
import { Card, CardTitle } from "@dingify/ui/components/card";
import { ScrollArea } from "@dingify/ui/components/scroll-area";

import { formatCurrency } from "@/lib/utils";

import { Mail } from "../data";
import { useMail } from "../use-mail";

interface MailListProps {
  items: Mail[];
}

export function Investmentcards({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  // Group items by category
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      // @ts-ignore
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, Mail[]>,
  );

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-4 p-4 pt-0">
        {Object.entries(groupedItems).map(([category, items]) => (
          <React.Fragment key={category}>
            <h2 className="text-lg font-semibold">{category}</h2>
            {items.map((item) => (
              <Card
                key={item.id}
                onClick={() => setMail({ ...mail, selected: item.id })}
                className="group flex items-center justify-between p-3 hover:bg-gray-100 hover:text-black"
              >
                <div className="flex grow flex-col">
                  <CardTitle className="font-bold">{item.name}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={item.change >= 0 ? "default" : "destructive"}
                    className="self-start"
                  >
                    {item.change >= 0
                      ? `▲ ${item.change}%`
                      : `▼ ${Math.abs(item.change)}%`}
                  </Badge>
                  <p className="flex-1 truncate text-sm font-medium">
                    {formatCurrency(item.available)}
                  </p>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
