import Button from '@/components/atoms/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Welcome to the Support Panel
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
        Your one-stop solution for all support queries. Submit new tickets or view the status of your existing ones.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login">
          <Button variant="primary" size="medium">
            Login
          </Button>
        </Link>
        
      </div>
      <div className="mt-10 text-center">
        {/* <p className="text-sm text-gray-500">
          For support agents and administrators, please access the{' '}
          <a
            href={process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ? `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/app` : 'http://localhost:9000/app'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Medusa Admin Dashboard
          </a>.
        </p> */}
      </div>
    </div>
  );
}