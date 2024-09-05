import { Sidebar } from '@/components/layout/sidebar';

export default function NotFound() {
  return (
    <>
      <div className="flex p-6 pb-0 md:gap-24">
        {/* <div className="flex min-h-[calc(100vh-88px)] p-6 pb-0 md:gap-24"> */}
        <aside>
          <Sidebar />
        </aside>
        <main className="w-full">Page not implemented</main>
      </div>
    </>
  );
}
