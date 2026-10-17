import React, { useState } from 'react';
import {
  Dialog,
  Input,
  Textarea,
  Button,
  Badge,
  SegmentedControl,
  FormSection,
  CustomSelect,
  useToast,
} from '@kaleemmolani/react';
import { PlusIcon, ActivityIcon, CheckIcon } from '../common/Icons';

export interface ExpenseModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ExpenseFormModal: React.FC<ExpenseModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [txType, setTxType] = useState<'expense' | 'income' | 'transfer'>('expense');
  const [amount, setAmount] = useState('149.00');
  const [currency, setCurrency] = useState('USD');
  const [payee, setPayee] = useState('Datadog APM Cloud');
  const [category, setCategory] = useState('infrastructure');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'reimburse'>('card');
  const [date, setDate] = useState('2026-10-17');
  const [notes, setNotes] = useState('Monthly observability and tracing pipeline invoice.');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success(`Logged $${amount} ${txType} to ${payee || 'Unspecified'}`, 'Transaction Recorded');
      onSuccess?.();
      onClose();
    }, 600);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Record New Transaction"
      description="Capture operational expenses, vendor disbursements, or incoming revenue."
      size="lg"
      badge={
        <Badge
          variant={txType === 'expense' ? 'danger' : txType === 'income' ? 'success' : 'info'}
          size="sm"
        >
          {txType.toUpperCase()}
        </Badge>
      }
      icon={<ActivityIcon size={18} />}
      footer={
        <>
          <Button variant="ghost" size="sm" type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="button"
            loading={loading}
            leadingIcon={<CheckIcon size={14} />}
            onClick={handleSubmit}
          >
            Save Transaction
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kui-space-4)' }}>
        {/* Transaction Type Segmented Pills */}
        <SegmentedControl<'expense' | 'income' | 'transfer'>
          fullWidth
          value={txType}
          onChange={setTxType}
          options={[
            {
              value: 'expense',
              label: 'Expense',
              badge: <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--kui-color-danger)' }} />,
            },
            {
              value: 'income',
              label: 'Income',
              badge: <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--kui-color-success)' }} />,
            },
            {
              value: 'transfer',
              label: 'Transfer',
              badge: <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--kui-color-info)' }} />,
            },
          ]}
        />

        {/* Hero Amount Inset Section */}
        <FormSection
          title="Monetary Value"
          description="Enter transaction amount and settlement currency."
          variant="card"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--kui-space-3)' }}>
            <Input
              size="hero"
              type="number"
              step="0.01"
              label="Transaction Amount"
              leadingAddon={
                <span
                  style={{
                    color: txType === 'expense' ? 'var(--kui-color-danger)' : 'var(--kui-color-brand-primary)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                  }}
                >
                  $
                </span>
              }
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <CustomSelect
              label="Settlement Currency"
              value={currency}
              onChange={setCurrency}
              options={[
                { value: 'USD', label: 'USD ($)', description: 'United States Dollar' },
                { value: 'EUR', label: 'EUR (€)', description: 'Euro Currency' },
                { value: 'GBP', label: 'GBP (£)', description: 'British Pound' },
                { value: 'INR', label: 'INR (₹)', description: 'Indian Rupee' },
              ]}
            />
          </div>
        </FormSection>

        {/* Primary Details (Payee, Category, Date, Method) */}
        <FormSection
          title="Classification & Timing"
          description="Group expenditure for quarterly financial auditing."
          variant="card"
          columns={2}
        >
          <Input
            label="Payee / Merchant"
            placeholder="e.g. AWS, Stripe, Google Cloud"
            value={payee}
            onChange={(e) => setPayee(e.target.value)}
            required
          />

          <CustomSelect
            label="Accounting Category"
            value={category}
            onChange={setCategory}
            options={[
              { value: 'infrastructure', label: 'Cloud Infrastructure', badge: <Badge variant="info" size="sm">DevOps</Badge> },
              { value: 'software', label: 'SaaS Subscriptions', badge: <Badge variant="neutral" size="sm">Tools</Badge> },
              { value: 'payroll', label: 'Contractor Payroll', badge: <Badge variant="success" size="sm">HR</Badge> },
              { value: 'marketing', label: 'Growth & Ads', badge: <Badge variant="warning" size="sm">Growth</Badge> },
            ]}
          />

          <Input
            type="date"
            label="Effective Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <SegmentedControl<'card' | 'bank' | 'reimburse'>
            label="Settlement Channel"
            fullWidth
            value={paymentMethod}
            onChange={setPaymentMethod}
            options={[
              { value: 'card', label: 'Corp Card' },
              { value: 'bank', label: 'ACH / Wire' },
              { value: 'reimburse', label: 'Expense' },
            ]}
          />
        </FormSection>

        {/* Notes & Receipt Attachment */}
        <FormSection
          title="Audit Trail & Documentation"
          description="Attach contextual remarks and supporting receipts."
          variant="card"
        >
          <Textarea
            label="Accounting Notes"
            placeholder="Add context, project billing codes, or tax identifiers..."
            showCount
            maxLength={160}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* Clean Receipt Upload Dropzone */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--kui-space-2)',
              padding: 'var(--kui-space-4)',
              backgroundColor: 'var(--kui-color-surface)',
              border: '1.5px dashed var(--kui-color-border-strong)',
              borderRadius: 'var(--kui-radius-md)',
              cursor: 'pointer',
              transition: 'all var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--kui-color-surface-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--kui-color-brand-primary)',
              }}
            >
              <PlusIcon size={16} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--kui-font-size-xs)', fontWeight: 600, color: 'var(--kui-color-text-primary)' }}>
                Upload Receipt / Invoice
              </span>
              <p style={{ margin: '2px 0 0 0', fontSize: 'var(--kui-font-size-xs)', color: 'var(--kui-color-text-muted)' }}>
                Drag and drop PDF or PNG receipt up to 10MB
              </p>
            </div>
          </div>
        </FormSection>
      </form>
    </Dialog>
  );
};
