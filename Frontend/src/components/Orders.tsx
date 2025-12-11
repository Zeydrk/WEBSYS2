import React, { useState } from 'react';

// 1. Define a type for the possible order statuses (tabs)
type OrderStatus = 'onShipping' | 'arrived' | 'cancelled';

// 2. Mock Data Structure (for rendering content)
interface Order {
    id: string;
    status: OrderStatus;
    sourcePlanet: string;
    arrivalDate: string;
    destination: string;
    totalPrice: string;
    items: {
        name: string;
        price: number;
        quantity: number;
        imgSrc: string;
    }[];
}

// interface orderSpecies {
//     orderSpeciesId: string;
//     orderId: {
//         customerId: string
//         logisticsId: {
//             name: string

//         }

//     }
//     petId: string
//     quantity: number
//     specieBaseCost : number
//     transportCostApplied: number
//     finalItemCost: number
// }

// Mock Order Data to display in the tabs
const mockOrders: Order[] = [
    {
        id: '#987654321',
        status: 'onShipping',
        sourcePlanet: 'Krypton VII',
        arrivalDate: '2026-01-15',
        destination: 'Earth, Sol System',
        totalPrice: '450.00 GC',
        items: [{
            name: 'Xylosian Fluffball',
            price: 225.00,
            quantity: 2,
            imgSrc: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        }],
    },
    {
        id: '#123456789',
        status: 'onShipping',
        sourcePlanet: 'Mars Base 3',
        arrivalDate: '2026-02-01',
        destination: 'Jupiter Colony',
        totalPrice: '120.00 GC',
        items: [{
            name: 'Cosmic Ray Gun',
            price: 60.00,
            quantity: 2,
            imgSrc: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp', // Using same placeholder
        }],
    },
    {
        id: '#000000001',
        status: 'arrived',
        sourcePlanet: 'Venus',
        arrivalDate: '2025-10-20',
        destination: 'Earth, Sol System',
        totalPrice: '75.00 GC',
        items: [{
            name: 'Space Rocks',
            price: 75.00,
            quantity: 1,
            imgSrc: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        }],
    },
    {
        id: '#333333333',
        status: 'cancelled',
        sourcePlanet: 'Saturn',
        arrivalDate: 'N/A',
        destination: 'Void',
        totalPrice: '0.00 GC',
        items: [{
            name: 'Black Hole Tickets',
            price: 500.00,
            quantity: 1,
            imgSrc: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
        }],
    },
];

// Helper to count orders for the tab labels
const getOrderCount = (status: OrderStatus) => {
    return mockOrders.filter(order => order.status === status).length;
};

// Helper function to get badge colors and icons
const getStatusDetails = (status: OrderStatus) => {
    switch (status) {
        case 'onShipping':
            return { icon: '', text: 'On Shipping', bg: 'bg-green-500', shadow: 'shadow-green-900/50' };
        case 'arrived':
            return { icon: '', text: 'Arrived', bg: 'bg-blue-500', shadow: 'shadow-blue-900/50' };
        case 'cancelled':
            return { icon: '', text: 'Cancelled', bg: 'bg-red-500', shadow: 'shadow-red-900/50' };
        default:
            return { icon: '', text: '', bg: '', shadow: '' };
    }
};

export default function Orders() {
    // 3. Use state to manage the active tab. Initialize it to 'onShipping'.
    const [activeTab, setActiveTab] = useState<OrderStatus>('onShipping');

    // 4. Filter orders based on the active tab state
    const filteredOrders = mockOrders.filter(order => order.status === activeTab);

    // Component for a single Order Card (for reusability)
    const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
        const { icon, text, bg, shadow } = getStatusDetails(order.status);
        
        // This is a basic example; you should calculate item totals for real data
        const firstItem = order.items[0]; 

        return (
            
            <div className="card bg-slate-800/60 backdrop-blur-md shadow-xl border border-white/10 p-4">
                {/* order ID and status symbol */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                    <div>
                        <h2 className="text-xl font-bold text-white">Order ID: <span className="text-purple-300">{order.id}</span></h2>
                    </div>
                    <div>
                        {/* Status Badge - dynamic classes */}
                        <span className={`badge badge-lg ${bg} text-white border-none font-bold shadow-md ${shadow}`}>
                            {icon} {text}
                        </span>
                    </div>
                </div>

                {/* order details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4 border-b border-white/10 pb-4">
                    <div className="flex flex-col">
                        <span className="text-purple-300 font-semibold">Source Planet:</span>
                        <span className="text-white">{order.sourcePlanet}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-purple-300 font-semibold">Est. Arrival:</span>
                        <span className="text-white">{order.arrivalDate}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-purple-300 font-semibold">Destination:</span>
                        <span className="text-white">{order.destination}</span>
                    </div>
                </div>

                {/* order items (showing the first item for brevity) */}
                {firstItem && (
                    <div className="flex gap-4 items-center bg-slate-900/50 p-3 rounded-lg border border-white/10">
                        <div className="w-16 h-16 shrink-0">
                            <img
                                src={firstItem.imgSrc}
                                alt={firstItem.name}
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                        <div className="">
                            <h3 className="text-lg font-bold text-white truncate">{firstItem.name}</h3>
                            <h4>Price: <span className="text-sm text-purple-400 font-bold">{firstItem.price.toFixed(2)} GC</span></h4>
                            <span>Quantity: <span className="text-sm font-bold">{firstItem.quantity}</span></span>
                        </div>
                    </div>
                )}
                
                {/* Total Price  */}
                <div className="flex justify-end mt-4">
                    <div className="flex flex-col items-end">
                        <span className="text-purple-300 font-semibold">Total Price:</span>
                        <span className="text-white text-xl font-bold">{order.totalPrice}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-linear-to-b from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans p-4">
                <div className="container mx-auto py-8">
                    
                    {/* heading */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-300 to-white drop-shadow-md">
                            Your Galaxy Orders
                        </h1>
                    </div>

                    {/* div for order statuses (Tabs) */}
                    <div className="tabs tabs-boxed bg-slate-800/50 backdrop-blur-sm p-1 rounded-xl shadow-lg border border-purple-500/20 mb-8 overflow-x-auto">
                        
                        {/* 5. On Shipping Tab - Use onClick and conditional class */}
                        <a 
                            className={`tab tab-lg text-slate-300 font-semibold hover:bg-purple-800/30 ${activeTab === 'onShipping' ? 'tab-active bg-purple-700 text-white' : ''}`}
                            onClick={() => setActiveTab('onShipping')}
                        >
                            On Shipping ({getOrderCount('onShipping')})
                        </a>

                        {/* 5. Arrived Orders Tab - Use onClick and conditional class */}
                        <a 
                            className={`tab tab-lg text-slate-300 font-semibold hover:bg-purple-800/30 ${activeTab === 'arrived' ? 'tab-active bg-purple-700 text-white' : ''}`}
                            onClick={() => setActiveTab('arrived')}
                        >
                            Arrived ({getOrderCount('arrived')})
                        </a>

                        {/* 5. Cancelled Status Tab - Use onClick and conditional class */}
                        <a 
                            className={`tab tab-lg text-slate-300 font-semibold hover:bg-purple-800/30 ${activeTab === 'cancelled' ? 'tab-active bg-purple-700 text-white' : ''}`}
                            onClick={() => setActiveTab('cancelled')}
                        >
                            Cancelled ({getOrderCount('cancelled')})
                        </a>
                    </div>

                    {/* 6. Conditionally rendered content */}
                    <div className="space-y-6">
                        {filteredOrders.length > 0 ? (
                            filteredOrders.map(order => (
                                <OrderCard key={order.id} order={order} />
                            ))
                        ) : (
                            <div className="text-center p-12 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/10">
                                <p className="text-2xl font-semibold text-purple-300">
                                    No orders found in the "{activeTab.replace('onShipping', 'On Shipping')}" category.
                                </p>
                                <p className="text-sm text-slate-400 mt-2">
                                    Maybe you need to explore the galaxy shop for more exotic pets!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}