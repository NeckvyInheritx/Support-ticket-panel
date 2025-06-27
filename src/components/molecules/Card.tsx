export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div
    className={`rounded-md bg-white text-gray-900 shadow-sm hover:shadow-lg transition-shadow duration-200 ${className}`}
  >
    {children}
  </div>
)

export const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 pb-4 ${className || ''}`}>{children}</div>

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <h3 className={`text-lg font-semibold leading-tight ${className}`}>
    {children}
  </h3>
)

export const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <div className={`p-6 pb-4 ${className}`}>{children}</div>

export const CardFooter = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={`px-6 py-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
)
