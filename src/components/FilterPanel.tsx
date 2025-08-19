'use client';

import { StatusFilter } from "@/app/page";

interface FilterPanelProps {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
	startDate: string;
	setStartDate: (date: string) => void;
	endDate: string;
	setEndDate: (date: string) => void;
	clearFilters: () => void;
	totalCount: number;
	filteredCount: number;
	statusFilter?: StatusFilter;
	setStatusFilter?: (status: StatusFilter) => void;
}

export function FilterPanel({
	searchTerm,
	setSearchTerm,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	clearFilters,
	totalCount,
	filteredCount,
	statusFilter = 'all',
	setStatusFilter
}: FilterPanelProps) {
	return (
		<div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col gap-4">
			<div className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
				{/* Search Input */}
				<div className="flex-1 min-w-0">
					<label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-2">
						Search Reflections
					</label>
					<input
						type="text"
						id="search-input"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search by title or slug..."
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
					/>
				</div>

				{/* Date Range */}
				<div className="flex-1 min-w-0">
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						Date Range
					</label>
					<div className="flex gap-3">
						<div className="flex-1">
							<input
								type="date"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								placeholder="Start date"
							/>
						</div>
						<div className="flex items-center text-gray-500 font-medium">
							to
						</div>
						<div className="flex-1">
							<input
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
								placeholder="End date"
							/>
						</div>
					</div>
				</div>

				{/* Status Filter */}
				<div className="flex flex-col sm:flex-row gap-3 mt-6">
					<div className="min-w-[220px]">
						<label htmlFor="status-filter" className="block text-sm font-semibold text-gray-700 mb-2">
							Indexing Status
						</label>
						<select
							id="status-filter"
							value={statusFilter}
							onChange={(e) => setStatusFilter?.(e.target.value as StatusFilter)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
						>
							<option value="all">All statuses</option>
							<option value="complete">Indexing complete</option>
							<option value="requested">Indexing requested</option>
							<option value="not-indexed">Not indexed</option>
						</select>
					</div>

					{/* Clear Filters Button */}
					<button
						onClick={clearFilters}
						className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap self-start sm:self-end"
					>
						Clear Filters
					</button>
				</div>

			</div>
				{/* Results Count */}
				<div className="mt-4 text-sm text-gray-600">
					{filteredCount === totalCount ? (
						`Showing all ${totalCount} reflections`
					) : (
						`Showing ${filteredCount} of ${totalCount} reflections`
					)}
				</div>
		</div>
	);
} 