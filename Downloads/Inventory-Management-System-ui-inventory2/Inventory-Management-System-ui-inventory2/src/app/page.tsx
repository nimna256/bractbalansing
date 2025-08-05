import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { Package, Shield, BarChart3, Settings } from "lucide-react";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			{/* Header */}
			<header className="border-b bg-white/80 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Package className="h-8 w-8 text-blue-600" />
						<h1 className="text-2xl font-bold text-gray-900">Inventory Pro</h1>
					</div>
					<div className="flex gap-2">
						<Button asChild variant="outline">
							<Link href="/auth/login">Login</Link>
						</Button>
						<Button asChild>
							<Link href="/auth/register">Get Started</Link>
						</Button>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<main className="container mx-auto px-4 py-16">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						Professional Computer Parts Inventory Management
					</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Streamline your computer parts inventory with advanced stock
						management, intelligent discounting, and comprehensive sales
						tracking.
					</p>
					<Button asChild size="lg" className="text-lg px-8 py-3">
						<Link href="/auth/register">Start Managing Inventory</Link>
					</Button>
				</div>

				{/* Features Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
					<Card className="text-center">
						<CardHeader>
							<Package className="h-12 w-12 text-blue-600 mx-auto mb-4" />
							<CardTitle>Stock Management</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Track inventory levels, manage damaged goods, and monitor stock
								movements in real-time.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<BarChart3 className="h-12 w-12 text-green-600 mx-auto mb-4" />
							<CardTitle>Smart Discounts</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Create bulk discounts, time-based promotions, and combined
								discount strategies.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
							<CardTitle>Admin Control</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Secure admin authentication with role-based access and
								comprehensive user management.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="text-center">
						<CardHeader>
							<Settings className="h-12 w-12 text-orange-600 mx-auto mb-4" />
							<CardTitle>Category System</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Organize computer parts by categories for intuitive browsing and
								management.
							</CardDescription>
						</CardContent>
					</Card>
				</div>

				{/* CTA Section */}
				<div className="text-center bg-white rounded-lg shadow-lg p-8">
					<h3 className="text-2xl font-bold text-gray-900 mb-4">
						Ready to optimize your inventory?
					</h3>
					<p className="text-gray-600 mb-6">
						Join inventory managers who trust Inventory Pro for their computer
						parts business.
					</p>
					<div className="flex gap-4 justify-center">
						<Button asChild size="lg">
							<Link href="/auth/register">Create Admin Account</Link>
						</Button>
						<Button asChild variant="outline" size="lg">
							<Link href="/auth/login">Admin Login</Link>
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
