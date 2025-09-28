import { NextResponse } from "next/server";

export async function GET() {
    try {
        const url = `${process.env.FIXER_BASE_URL}/symbols?access_key=${process.env.FIXER_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();
        
        if(data.success) {
            const currencyArray = Object.keys(data.symbols);
            return NextResponse.json({success: true, currencies: currencyArray});
        } else {
            return NextResponse.json({success:false, error: 'failed to fetch currencies'},
                {status: 400}
            );
        }

    } catch (error) {
        console.error('Currency API error:', error);
        return NextResponse.json({success: false, error: 'Server error'},
            {status: 500}
        );
    }
}