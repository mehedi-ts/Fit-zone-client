"use client";

import { Table, Card } from "@heroui/react";
import { CreditCard } from "lucide-react";

export default function TransactionsTable({ transactions = [] }) {
  if (!transactions.length) {
    return (
      <Card>
        <Card.Content className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <h2 className="text-xl font-semibold">No Transactions Found</h2>
          <p className="mt-2 text-default-500">
            There are currently no payment transactions on the platform.
          </p>
        </Card.Content>
      </Card>
    );
  }

  return (
    <>
      {/* ════════════════ MOBILE — CARD LIST ════════════════ */}
      <div className="flex flex-col gap-3 md:hidden">
        {transactions.map((txn) => (
          <Card key={txn._id} className="border border-default-200">
            <Card.Content className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CreditCard size={18} className="text-primary" />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="font-medium truncate">{txn.email}</span>
                  <span className="text-xs text-default-400 mt-0.5">
                    {txn.createdAt
                      ? new Date(txn.createdAt).toLocaleDateString()
                      : "—"}
                  </span>
                </div>

                <div className="text-sm font-semibold text-success shrink-0">
                  ${txn.amount ?? "—"}
                </div>
              </div>

              <div className="mt-3 rounded-lg bg-default-100 px-3 py-2">
                <p className="text-xs text-default-500">Transaction ID</p>
                <p className="text-xs font-mono text-default-700 truncate mt-0.5">
                  {txn.paymentIntentId}
                </p>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* ════════════════ DESKTOP — TABLE ════════════════ */}
      <div className="hidden md:block">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Transactions Table">
              <Table.Header>
                <Table.Column isRowHeader>USER EMAIL</Table.Column>
                <Table.Column>AMOUNT</Table.Column>
                <Table.Column>DATE</Table.Column>
                <Table.Column>TRANSACTION ID</Table.Column>
              </Table.Header>

              <Table.Body>
                {transactions.map((txn) => (
                  <Table.Row key={txn._id} id={txn._id}>
                    <Table.Cell>
                      <span className="text-sm font-medium">{txn.email}</span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-sm font-semibold text-success">
                        ${txn.amount ?? "—"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      {txn.createdAt
                        ? new Date(txn.createdAt).toLocaleDateString()
                        : "—"}
                    </Table.Cell>

                    <Table.Cell>
                      <span className="font-mono text-xs text-default-500">
                        {txn.paymentIntentId}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </>
  );
}
