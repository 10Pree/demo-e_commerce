import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// #endregion
export function Graph1({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                responsive
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 5,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="income" stroke="purple" strokeWidth={2} name="รายได้ (บาท)" />
                <XAxis dataKey="name" />
                <YAxis width="auto" label={{ value: 'บาท', position: 'insideLeft', angle: -90 }} />
                <Legend align="right" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}

export function Graph2({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                responsive
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 5,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="orders" stroke="purple" strokeWidth={2} name="จำนวนออเดอร์" />
                <XAxis dataKey="name" />
                <YAxis width="auto" label={{ value: 'orders', position: 'insideLeft', angle: -90 }} />
                <Legend align="right" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}

export function Graph3({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                responsive
                data={data}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 5,
                    left: 0,
                }}
            >
                <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="stock" stroke="purple" strokeWidth={2} name="จำนวนสินค้า" />
                <XAxis dataKey="category" />
                <YAxis width="auto" label={{ value: 'ชิ้น', position: 'insideLeft', angle: -90 }} />
                <Legend align="right" />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}
