import  { InitialProfile } from '@/lib/initial-profile';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from  'next/link';
const SetupPage = async() => {
    const profile = await  InitialProfile();
    return (
        <Link href="/leitner-box">
            Box
        </Link>
    );
}
 
export default SetupPage;