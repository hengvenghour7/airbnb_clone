import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import Link from "next/link";

export default function LoginSignUp () {
    return (
        <div className="flex items-center justify-center pt-12">
                    <Card className="w-[60%]" sx={{ minWidth: 275 }}>
                        <CardContent className="flex flex-col gap-3">
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                Login or SignUp
                            </Typography>
                            <Divider />
                            <h3>Welcome to Clonebnb</h3>
                            <Link href='/loginSignUp/login'>
                                <Button className="w-full" variant="contained" color="error" size="small">Login</Button>
                            </Link>
                            <Link href='/loginSignUp/signUp'>
                                <Button className="w-full" variant="outlined" color="info" size="small">SignUp</Button>
                            </Link>
                            <Divider />
                            <div className="w-full text-center">or</div>
                            <Button className="w-full" variant="outlined" color="info" size="small">Continue with Google</Button>
                        </CardContent>
                    </Card>
                </div>
    )
}
