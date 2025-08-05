import Link from "next/link";
import { Mail, Package } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function CheckEmailPage() {
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
							<div className="flex justify-center mb-4">
								<Mail className="h-12 w-12 text-blue-600" />
							</div>
							<CardTitle className="text-2xl">Check Your Email</CardTitle>
							<CardDescription>
								We've sent you a confirmation link
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center">
							<p className="text-sm text-gray-600 mb-6">
								Please check your email and click the confirmation link to
								activate your admin account. Once confirmed, you'll be able to
								access the inventory management system.
							</p>
							<Button asChild className="w-full">
								<Link href="/auth/login">Back to Login</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
