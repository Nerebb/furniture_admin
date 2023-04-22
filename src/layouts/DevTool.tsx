// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import React from 'react'
// import { Layout, LayoutProps } from 'react-admin'


// export default function DevTool({ ...props }: LayoutProps) {
//     return (
//         <>
//             <Layout {...props} />
//             <ReactQueryDevtools initialIsOpen={false} />
//         </>
//     )
// }

import { Layout } from 'react-admin';
import { ReactQueryDevtools } from 'react-query/devtools';

export const MyLayout = (props: any) => (
    <>
        <Layout {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);