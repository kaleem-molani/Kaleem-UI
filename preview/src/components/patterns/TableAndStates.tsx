import React, { useState } from 'react';
import { Badge, Button, IconButton, Checkbox, InlineAlert, Pagination } from '../primitives';
import {
  PlusIcon,
  RefreshIcon,
  KeyIcon,
  SearchIcon,
  FilterIcon,
  CopyIcon,
  TrashIcon,
  CheckIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
} from '../common/Icons';

export interface SecretItem {
  id: string;
  name: string;
  prefix: string;
  environment: 'Production' | 'Staging' | 'Development';
  status: 'Active' | 'Expiring' | 'Revoked';
  lastUsed: string;
  createdDate: string;
}

const INITIAL_DEMO_DATA: SecretItem[] = [
  {
    id: 'key-101',
    name: 'Primary Ingestion Webhook',
    prefix: 'kui_live_89fa...c2',
    environment: 'Production',
    status: 'Active',
    lastUsed: '4 mins ago',
    createdDate: 'Oct 12, 2026',
  },
  {
    id: 'key-102',
    name: 'Audit Log Archiver',
    prefix: 'kui_live_33bc...71',
    environment: 'Production',
    status: 'Expiring',
    lastUsed: '2 hours ago',
    createdDate: 'Sep 28, 2026',
  },
  {
    id: 'key-103',
    name: 'Staging Sync Worker',
    prefix: 'kui_stg_09aa...19',
    environment: 'Staging',
    status: 'Active',
    lastUsed: 'Yesterday',
    createdDate: 'Oct 02, 2026',
  },
  {
    id: 'key-104',
    name: 'Legacy Metrics Exporter',
    prefix: 'kui_dev_77fe...d0',
    environment: 'Development',
    status: 'Revoked',
    lastUsed: '14 days ago',
    createdDate: 'Aug 15, 2026',
  },
  {
    id: 'key-105',
    name: 'CI/CD Pipeline Dispatcher',
    prefix: 'kui_stg_41bb...93',
    environment: 'Staging',
    status: 'Active',
    lastUsed: 'Just now',
    createdDate: 'Oct 16, 2026',
  },
];

/* ----------------------------------------------------
   Data Table (Populated State)
---------------------------------------------------- */
export const DataTablePattern: React.FC<{
  onAddNew?: () => void;
  onSelectEmpty?: () => void;
}> = ({ onAddNew }) => {
  const [data, setData] = useState<SecretItem[]>(INITIAL_DEMO_DATA);
  const [selectedIds, setSelectedIds] = useState<string[]>(['key-101']);
  const [searchQuery, setSearchQuery] = useState('');
  const [envFilter, setEnvFilter] = useState<'All' | 'Production' | 'Staging' | 'Development'>('All');
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [sortField, setSortField] = useState<'name' | 'environment' | 'createdDate'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prefix.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnv = envFilter === 'All' || item.environment === envFilter;
    return matchesSearch && matchesEnv;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    const cmp = String(aVal).localeCompare(String(bVal));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedData = sortedData.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSortToggle = (field: 'name' | 'environment' | 'createdDate') => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('asc');
    }
    setCurrentPage(1);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((d) => d.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopyPrefix = (item: SecretItem) => {
    setCopiedKeyId(item.id);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.prefix).catch(() => {});
    }
    setTimeout(() => {
      setCopiedKeyId((current) => (current === item.id ? null : current));
    }, 2000);
  };

  const handleRevokeKey = (id: string) => {
    setData((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'Revoked' as const } : k))
    );
  };

  const getStatusBadge = (status: SecretItem['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" dot size="sm">Active</Badge>;
      case 'Expiring':
        return <Badge variant="warning" dot size="sm">Expiring soon</Badge>;
      case 'Revoked':
        return <Badge variant="danger" dot size="sm">Revoked</Badge>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--kui-space-3)',
        width: '100%',
      }}
    >
      {/* Copy banner notice */}
      {copiedKeyId && (
        <InlineAlert variant="info" onDismiss={() => setCopiedKeyId(null)}>
          Token prefix copied to clipboard for service reference.
        </InlineAlert>
      )}

      {/* Table Toolbar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--kui-space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flex: '1 1 240px', maxWidth: '340px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 'var(--kui-space-3)',
                color: 'var(--kui-color-text-muted)',
                pointerEvents: 'none',
                display: 'flex',
              }}
            >
              <SearchIcon size={14} />
            </div>
            <input
              type="search"
              aria-label="Filter credentials"
              placeholder="Filter credentials by name or prefix..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                height: '34px',
                width: '100%',
                paddingLeft: 'var(--kui-space-8)',
                paddingRight: 'var(--kui-space-3)',
                backgroundColor: 'var(--kui-color-surface)',
                border: '1px solid var(--kui-color-border)',
                borderRadius: 'var(--kui-radius-md)',
                fontSize: 'var(--kui-font-size-xs)',
                color: 'var(--kui-color-text-primary)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--kui-space-1)',
              backgroundColor: 'var(--kui-color-surface-subtle)',
              border: '1px solid var(--kui-color-border)',
              borderRadius: 'var(--kui-radius-sm)',
              padding: '2px',
            }}
          >
            <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)', paddingLeft: 'var(--kui-space-2)' }}>
              <FilterIcon size={12} />
            </span>
            {(['All', 'Production', 'Staging', 'Development'] as const).map((env) => (
              <button
                key={env}
                type="button"
                onClick={() => setEnvFilter(env)}
                style={{
                  fontSize: '11px',
                  fontWeight: envFilter === env ? 'var(--kui-font-weight-semibold)' : 'var(--kui-font-weight-regular)',
                  backgroundColor: envFilter === env ? 'var(--kui-color-surface)' : 'transparent',
                  color: envFilter === env ? 'var(--kui-color-text-primary)' : 'var(--kui-color-text-secondary)',
                  padding: '2px 8px',
                  borderRadius: 'var(--kui-radius-sm)',
                  boxShadow: envFilter === env ? 'var(--kui-shadow-sm)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {env}
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            leadingIcon={<PlusIcon size={14} />}
            onClick={onAddNew}
          >
            Create API Key
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div
        style={{
          backgroundColor: 'var(--kui-color-surface)',
          border: '1px solid var(--kui-color-border)',
          borderRadius: 'var(--kui-radius-lg)',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ textAlign: 'left', minWidth: '680px' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1px solid var(--kui-color-border)',
                  backgroundColor: 'var(--kui-color-surface-subtle)',
                }}
              >
                <th style={{ width: '40px', padding: 'var(--kui-space-3) var(--kui-space-4)' }}>
                  <Checkbox
                    label=""
                    checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
                <th
                  scope="col"
                  aria-sort={sortField === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  style={{ padding: '6px 8px', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSortToggle('name')}
                    aria-label={`Sort by Key Name, currently ${sortField === 'name' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                    style={{
                      all: 'unset',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 6px',
                      borderRadius: 'var(--kui-radius-sm)',
                      cursor: 'pointer',
                      color: sortField === 'name' ? 'var(--kui-color-brand-primary)' : 'inherit',
                      fontWeight: sortField === 'name' ? 'var(--kui-font-weight-semibold)' : 'inherit',
                    }}
                  >
                    <span>Key Name</span>
                    {sortField === 'name' ? (
                      sortDir === 'asc' ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />
                    ) : (
                      <ArrowUpDownIcon size={12} style={{ opacity: 0.4 }} />
                    )}
                  </button>
                </th>
                <th style={{ padding: 'var(--kui-space-3) var(--kui-space-3)', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                  Token Prefix
                </th>
                <th
                  scope="col"
                  aria-sort={sortField === 'environment' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  style={{ padding: '6px 8px', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSortToggle('environment')}
                    aria-label={`Sort by Environment, currently ${sortField === 'environment' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                    style={{
                      all: 'unset',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 6px',
                      borderRadius: 'var(--kui-radius-sm)',
                      cursor: 'pointer',
                      color: sortField === 'environment' ? 'var(--kui-color-brand-primary)' : 'inherit',
                      fontWeight: sortField === 'environment' ? 'var(--kui-font-weight-semibold)' : 'inherit',
                    }}
                  >
                    <span>Target</span>
                    {sortField === 'environment' ? (
                      sortDir === 'asc' ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />
                    ) : (
                      <ArrowUpDownIcon size={12} style={{ opacity: 0.4 }} />
                    )}
                  </button>
                </th>
                <th style={{ padding: 'var(--kui-space-3) var(--kui-space-3)', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                  Status
                </th>
                <th
                  scope="col"
                  aria-sort={sortField === 'createdDate' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  style={{ padding: '6px 8px', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}
                >
                  <button
                    type="button"
                    onClick={() => handleSortToggle('createdDate')}
                    aria-label={`Sort by Created Date, currently ${sortField === 'createdDate' ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'unsorted'}`}
                    style={{
                      all: 'unset',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 6px',
                      borderRadius: 'var(--kui-radius-sm)',
                      cursor: 'pointer',
                      color: sortField === 'createdDate' ? 'var(--kui-color-brand-primary)' : 'inherit',
                      fontWeight: sortField === 'createdDate' ? 'var(--kui-font-weight-semibold)' : 'inherit',
                    }}
                  >
                    <span>Last Used</span>
                    {sortField === 'createdDate' ? (
                      sortDir === 'asc' ? <ArrowUpIcon size={12} /> : <ArrowDownIcon size={12} />
                    ) : (
                      <ArrowUpDownIcon size={12} style={{ opacity: 0.4 }} />
                    )}
                  </button>
                </th>
                <th style={{ padding: 'var(--kui-space-3) var(--kui-space-4)', textAlign: 'right', fontSize: 'var(--kui-font-size-xs)', fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-secondary)' }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 'var(--kui-space-8)', textAlign: 'center', color: 'var(--kui-color-text-muted)', fontSize: 'var(--kui-font-size-xs)' }}>
                    No matching credentials for query "{searchQuery}"
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  const isCopied = copiedKeyId === item.id;
                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid var(--kui-color-border)',
                        backgroundColor: isSelected ? 'var(--kui-color-surface-subtle)' : 'transparent',
                        transition: 'background-color var(--kui-motion-duration-fast) var(--kui-motion-ease-standard)',
                      }}
                    >
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-4)' }}>
                        <Checkbox
                          label=""
                          checked={isSelected}
                          onChange={() => toggleSelectRow(item.id)}
                          aria-label={`Select ${item.name}`}
                        />
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-3)' }}>
                        <span style={{ fontWeight: 'var(--kui-font-weight-medium)', color: 'var(--kui-color-text-primary)' }}>
                          {item.name}
                        </span>
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-3)' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <code
                            style={{
                              backgroundColor: 'var(--kui-color-surface-subtle)',
                              padding: '2px 6px',
                              borderRadius: 'var(--kui-radius-sm)',
                              border: '1px solid var(--kui-color-border)',
                              color: 'var(--kui-color-text-secondary)',
                            }}
                          >
                            {item.prefix}
                          </code>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label={`Copy prefix for ${item.name}`}
                            icon={isCopied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
                            onClick={() => handleCopyPrefix(item)}
                          />
                        </div>
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-3)', color: 'var(--kui-color-text-secondary)' }}>
                        {item.environment}
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-3)' }}>
                        {getStatusBadge(item.status)}
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-3)', color: 'var(--kui-color-text-muted)' }}>
                        {item.lastUsed}
                      </td>
                      <td style={{ padding: 'var(--kui-space-3) var(--kui-space-4)', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                          {item.status !== 'Revoked' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              leadingIcon={<TrashIcon size={12} />}
                              onClick={() => handleRevokeKey(item.id)}
                            >
                              Revoke
                            </Button>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--kui-color-text-muted)' }}>Revoked</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--kui-space-3)',
            padding: 'var(--kui-space-3) var(--kui-space-4)',
            backgroundColor: 'var(--kui-color-surface-subtle)',
            fontSize: 'var(--kui-font-size-xs)',
            color: 'var(--kui-color-text-muted)',
            borderTop: '1px solid var(--kui-color-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--kui-space-2)' }}>
            <span>
              <strong style={{ color: 'var(--kui-color-text-primary)' }}>{selectedIds.length}</strong> selected
            </span>
          </div>
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            totalItems={sortedData.length}
            pageSize={pageSize}
            pageSizeOptions={[3, 5, 10]}
            onPageChange={setCurrentPage}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   Empty State
---------------------------------------------------- */
export const EmptyStatePattern: React.FC<{ onAction?: () => void }> = ({ onAction }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--kui-space-12) var(--kui-space-6)',
        backgroundColor: 'var(--kui-color-surface)',
        border: '1px dashed var(--kui-color-border-strong)',
        borderRadius: 'var(--kui-radius-lg)',
        textAlign: 'center',
        maxWidth: '520px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: 'var(--kui-radius-lg)',
          backgroundColor: 'var(--kui-color-surface-subtle)',
          border: '1px solid var(--kui-color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--kui-color-brand)',
          marginBottom: 'var(--kui-space-3)',
        }}
      >
        <KeyIcon size={20} />
      </div>

      <h3 style={{ fontSize: 'var(--kui-font-size-md)', marginBottom: 'var(--kui-space-1)' }}>
        No API keys provisioned
      </h3>

      <p
        style={{
          fontSize: 'var(--kui-font-size-sm)',
          color: 'var(--kui-color-text-secondary)',
          maxWidth: '380px',
          marginBottom: 'var(--kui-space-5)',
        }}
      >
        Generate a scoped authentication credential to allow microservices or background workers to access your environment.
      </p>

      <div style={{ display: 'flex', gap: 'var(--kui-space-3)' }}>
        <Button variant="primary" size="sm" leadingIcon={<PlusIcon size={14} />} onClick={onAction}>
          Generate First Key
        </Button>
        <Button variant="outline" size="sm">
          Read API Documentation
        </Button>
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   Loading Skeleton State
---------------------------------------------------- */
export const LoadingStatePattern: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--kui-color-surface)',
        border: '1px solid var(--kui-color-border)',
        borderRadius: 'var(--kui-radius-lg)',
        overflow: 'hidden',
        width: '100%',
      }}
      aria-busy="true"
      aria-label="Loading credentials"
    >
      <div style={{ padding: 'var(--kui-space-3) var(--kui-space-4)', borderBottom: '1px solid var(--kui-color-border)', backgroundColor: 'var(--kui-color-surface-subtle)' }}>
        <div style={{ height: '18px', width: '220px', backgroundColor: 'var(--kui-color-border)', borderRadius: 'var(--kui-radius-sm)', opacity: 0.6 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--kui-space-4)',
              padding: 'var(--kui-space-4)',
              borderBottom: i < 4 ? '1px solid var(--kui-color-border)' : 'none',
            }}
          >
            <div style={{ width: '16px', height: '16px', borderRadius: 'var(--kui-radius-sm)', backgroundColor: 'var(--kui-color-border)', opacity: 0.5 }} />
            <div style={{ height: '14px', width: '160px', borderRadius: 'var(--kui-radius-sm)', backgroundColor: 'var(--kui-color-border)', opacity: 0.7 }} />
            <div style={{ height: '14px', width: '120px', borderRadius: 'var(--kui-radius-sm)', backgroundColor: 'var(--kui-color-border)', opacity: 0.5 }} />
            <div style={{ height: '14px', width: '80px', borderRadius: 'var(--kui-radius-sm)', backgroundColor: 'var(--kui-color-border)', opacity: 0.5 }} />
            <div style={{ height: '18px', width: '70px', borderRadius: 'var(--kui-radius-full)', backgroundColor: 'var(--kui-color-border)', opacity: 0.6 }} />
            <div style={{ height: '14px', width: '90px', borderRadius: 'var(--kui-radius-sm)', backgroundColor: 'var(--kui-color-border)', opacity: 0.4, marginLeft: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ----------------------------------------------------
   Inline Error State
---------------------------------------------------- */
export const ErrorStatePattern: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => {
  return (
    <InlineAlert
      variant="danger"
      title="Credential Service Unavailable"
      action={
        onRetry && (
          <Button
            variant="outline"
            size="sm"
            leadingIcon={<RefreshIcon size={13} />}
            onClick={onRetry}
          >
            Retry Handshake
          </Button>
        )
      }
    >
      Unable to establish a secure handshake with the key management authority. Check cluster network policies or retry the operation.
    </InlineAlert>
  );
};
