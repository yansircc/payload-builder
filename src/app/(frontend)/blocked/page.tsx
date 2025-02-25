import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BlockedPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-destructive">
            Access Restricted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            We apologize, but access to this website is not available in your region due to
            restrictions. If you believe this is an error, please contact our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
