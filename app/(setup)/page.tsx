import  { InitialProfile } from '@/lib/initial-profile';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Link from  'next/link';
const SetupPage = async() => {
    const profile = await  InitialProfile();
    return (
        <div>
            <Link href="/leitner-box">
                Box
            </Link>
            <Link href="/mindmap">
                MindMap
            </Link>
        </div>

    );
}
 
export default SetupPage;