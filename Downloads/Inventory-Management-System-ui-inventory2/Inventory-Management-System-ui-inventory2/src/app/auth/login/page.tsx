"use client";

import type React from "react";
import { createClient } from "~/lib/supabase/client";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Package } from "lucide-react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const supabase = createClient();
		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
				options: {
					emailRedirectTo:
						process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
						`${window.location.origin}/dashboard`,
				},
			});
			if (error) throw error;
			router.push("/dashboard");
		} catch (error: unknown) {
			setError(error instanceof Error ? error.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
			<div className="w-full max-w-md">
				<div className="flex flex-col gap-6">
					<div className="flex items-center justify-center gap-2 mb-8">
						<Package className="h-8 w-8 text-blue-600" />
						<h1 className="text-2xl font-bold text-gray-900">Inventory Pro</h1>
					</div>

					<Card className="shadow-lg">
						<CardHeader className="text-center">
							<CardTitle className="text-2xl">Admin Login</CardTitle>
							<CardDescription>
								Sign in to access the inventory management system
							</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleLogin}>
								<div className="flex flex-col gap-4">
									<div className="grid gap-2">
										<Label htmlFor="email">Email</Label>
										<Input
											id="email"
											type="email"
											placeholder="admin@example.com"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="password">Password</Label>
										<Input
											id="password"
											type="password"
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									{error && (
										<div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
											{error}
										</div>
									)}
									<Button type="submit" className="w-full" disabled={isLoading}>
										{isLoading ? "Signing in..." : "Sign In"}
									</Button>
								</div>
								<div className="mt-4 text-center text-sm text-gray-600">
									Need an admin account?{" "}
									<Link
										href="/auth/register"
										className="text-blue-600 hover:underline"
									>
										Register here
									</Link>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
