'use client';

import { useState } from 'react';

export default function DataManagementPage() {
    const [importing, setImporting] = useState(false);
    const [message, setMessage] = useState('');

    const handleExport = () => {
        window.location.href = '/api/admin/export';
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm('This will replace all current content with the backup. Are you sure?')) {
            e.target.value = '';
            return;
        }

        setImporting(true);
        setMessage('Importing...');

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            const res = await fetch('/api/admin/import', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (result.success) {
                setMessage('Import successful!');
            } else {
                setMessage(`Import failed: ${result.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            setMessage('Import failed: Invalid file or server error');
        } finally {
            setImporting(false);
            e.target.value = '';
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Data Management</h1>

            <div className="grid gap-8 md:grid-cols-2">
                <div className="p-6 border rounded-lg bg-card shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Export Content</h2>
                    <p className="text-muted-foreground mb-6">
                        Download a full backup of all website content (posts, services, products, etc.) as a JSON file.
                    </p>
                    <button
                        onClick={handleExport}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                    >
                        Export Backup
                    </button>
                </div>

                <div className="p-6 border rounded-lg bg-card shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Import Content</h2>
                    <p className="text-muted-foreground mb-6">
                        Restore content from a backup file. <span className="text-red-500 font-bold">Warning: This will overwrite existing data.</span>
                    </p>
                    <label className="block">
                        <span className="sr-only">Choose backup file</span>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            disabled={importing}
                            className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-violet-50 file:text-violet-700
                                hover:file:bg-violet-100
                            "
                        />
                    </label>
                    {message && (
                        <p className={`mt-4 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
