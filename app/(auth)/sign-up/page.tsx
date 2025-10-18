"use client";

import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardFooter, 
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

function SignUpPage() {
    const router = useRouter();

    const { isLoaded, signUp, setActive } = useSignUp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if(!isLoaded || isSubmitting) {
            return;
        }
        setIsSubmitting(true);
        setError("");

        try {
            const signUpAttempt = await signUp.create({
                emailAddress: email,
                password: password,
            });
            if(signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                // Small delay to allow webhook to process
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push("/profile");
            } else {
                console.log("Sign-up Failed", signUpAttempt);
                setError("Sign-up incomplete. Please try again.");
            }
        } catch (error: any) {
            console.error("Sign-up Error. Please try again", error);
            const errorMessage = error?.errors?.[0]?.longMessage || 
                                 error?.errors?.[0]?.message || 
                                 "Sign-up failed. Please try again.";
            
            setError(errorMessage);

        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-accent-foreground">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Create an Account on WanderNav</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className="space-y-4">
                                             
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                autoComplete="email" 
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/sign-in" className="font-medium text-primary hover:underline">
                            Sign In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
export default SignUpPage;


