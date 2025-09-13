import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeaturedPosts } from "@/lib/data";
import { placeholderImages } from "@/lib/placeholder-images";
import BlogCard from "@/components/blog/blog-card";
import Link from "next/link";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
    const user = {
        name: "Alex Johnson",
        email: "alex.j@example.com",
        avatarId: "user-avatar-1"
    }
    const avatar = placeholderImages.find(p => p.id === user.avatarId);
    const savedPosts = getFeaturedPosts().slice(0,2);

    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
             <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="flex flex-col items-center text-center space-y-4">
                        <Avatar className="h-24 w-24">
                           {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} />}
                            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">Edit Profile</Button>
                            <Button variant="ghost" asChild>
                                <Link href="/"><LogOut className="mr-2 h-4 w-4"/> Logout</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-8">
                            <h2 className="font-headline text-2xl font-bold mb-4">Saved Trips</h2>
                             {savedPosts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {savedPosts.map(post => (
                                        <BlogCard key={post.slug} post={post} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-muted rounded-lg">
                                    <p>You haven't saved any trips yet.</p>
                                    <Button variant="link" asChild><Link href="/blog">Start exploring</Link></Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
    )
}
