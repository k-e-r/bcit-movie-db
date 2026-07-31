export const PageLayout = ({ title, subtitle, description, children }) => {
    return (
    <main className="w-full flex flex-col items-center text-center px-4 pt-24 pb-32 md:pt-[200px] md:pb-[300px]">

        <h1 className="text-4xl md:text-[64px] font-bold tracking-wider mb-16 md:mb-[124px] leading-tight">
        {title}
        </h1>

    
        <div className="w-full max-w-2xl flex flex-col items-center gap-8 md:gap-[48px]">
        
        
        {subtitle && (
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {subtitle}
            </h2>
        )}

        {description && (
            <p className="text-base md:text-[20px] text-gray-700 leading-relaxed max-w-xl">
            {description}
            </p>
        )}

        {children}
        </div>

    </main>
    );
};