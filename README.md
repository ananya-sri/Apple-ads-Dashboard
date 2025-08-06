# Apple Search Ads Dashboard

A React-based dashboard that replicates the Apple Search Ads management platform interface, featuring a modern design with interactive components and real-time data visualization.



## Features

- **Responsive Design**: Modern, clean interface that matches the original design
- **Interactive Sidebar**: Navigation with highlighted active states
- **Dynamic Tabs**: Switch between different sections (Accounts, Apps, Campaigns, etc.)
- **Collapsible Sections**: Total Summary and Chart sections can be expanded/collapsed
- **Interactive Chart**: Line chart showing spend data with tooltips
- **Data Table**: Sortable table with row selection and action buttons
- **Dropdown Menus**: Functional action buttons with dropdown options
- **Real-time Updates**: Dynamic selection states and data updates
- **Advanced Search**: Global search with suggestions and recent searches
- **Date Range Selection**: Interactive date picker with preset options
- **Real-time Notifications**: Toast notifications for user actions
- **Advanced Filtering**: Multi-criteria filtering for table data
- **CSV Export**: Download filtered data as CSV files
- **Bulk Actions**: Select multiple rows and perform bulk operations

## Components

- **Sidebar**: Navigation icons with active states
- **Header**: Title, navigation tabs, and date selector
- **Hero Section**: Main headline, description, and video guide
- **Summary Section**: KPI boxes with metrics
- **Chart Section**: Interactive line chart using Recharts
- **Table Section**: Data table with actions and filters
- **Notification Panel**: Real-time notifications system
- **Search Modal**: Advanced search functionality

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chiragck10/Apple-Ad-Blocker..git
   cd Apple-Ad-Blocker.
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)
- `npm run deploy` - Deploys to GitHub Pages

## Technologies Used

- **React 18** - Frontend framework
- **Recharts** - Chart library for data visualization
- **Lucide React** - Icon library
- **CSS3** - Styling with modern CSS features
- **JavaScript ES6+** - Modern JavaScript features
- **GitHub Pages** - Hosting and deployment

## Functionality

### Interactive Elements

1. **Sidebar Navigation**: Click on icons to navigate (Settings is currently active)
2. **Tab Navigation**: Switch between different sections (Apps is currently active)
3. **Collapsible Sections**: Click on section headers to expand/collapse
4. **Action Buttons**: 
   - "How to read the metrics" - Shows alert
   - "Skip" - Shows alert
   - Video guide - Shows alert
   - Table action buttons - Show dropdowns with options
5. **Table Interactions**:
   - Row selection with checkboxes
   - Select all functionality
   - Dropdown menus for actions, rules, quick edit, and labels
   - Column sorting
   - Advanced filtering
   - CSV export
6. **Chart**: Interactive line chart with tooltips
7. **Search**: Global search with suggestions and recent searches
8. **Date Selection**: Interactive date range picker
9. **Notifications**: Real-time toast notifications

### Data

The dashboard uses sample data that matches the original design:
- KPI metrics with positive/negative indicators
- Chart data showing spend over time
- Table data with performance metrics
- All values match the original image exactly

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. Triggers on pushes to the main branch
2. Installs dependencies
3. Builds the production version
4. Deploys to GitHub Pages

The live application is available at: https://chiragck10.github.io/Apple-Ad-Blocker.

## Customization

You can easily customize the dashboard by:
- Modifying the color scheme in CSS variables
- Adding new tabs or sections
- Updating the chart data
- Adding new functionality to buttons
- Customizing the table columns and data

## Browser Support

The application works on all modern browsers that support React 18 and ES6+ features.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE). 
