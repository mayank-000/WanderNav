import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = await request.json();
    const { from, to, amount } = body;

    try {
        if (!from || !to || !amount) {
          return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }
    
        const testurl = 'https://api.exchangerate-api.com/v4/latest/USD';

        const testresponse = await fetch(testurl)
        const testdata = await testresponse.json();

        // Now do the actual conversion
        const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

        const response = await fetch(url);
        const data = await response.json();
    
        if(data.rates && data.rates[to]) {

            const rate = data.rates[to];
            const result = amount * rate;

            return NextResponse.json({
                success: true,
                result: parseFloat(result.toFixed(2)),
                rate: parseFloat(rate.toFixed(6)),
            });
        } else {
            return NextResponse.json({
                success: false,
                error: `Cannot convert ${from} to ${to}`
            }, {status: 400});
        }
    } catch (error) {
        return NextResponse.json({
            success: false, 
            error: 'Server Error'
        }, {status: 500});
    }    
}