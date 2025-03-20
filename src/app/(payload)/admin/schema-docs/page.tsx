'use client'

import React from 'react'
import Link from 'next/link'

const SchemaDocsPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Structured Data / Schema Guide</h1>

      <div className="mb-8">
        <p className="mb-4">
          This feature allows you to enhance your site&apos;s SEO by adding structured data markup
          (schema.org) to your pages and posts. Structured data helps search engines understand your
          content and can lead to rich results in search listings.
        </p>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Automatic Schema Generation</h2>
        <p className="mb-4">
          By default, appropriate schema is generated automatically for each page and post based on
          its content:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Posts</strong> - Use BlogPosting schema with author, date, and category
            information
          </li>
          <li>
            <strong>Pages</strong> - Use WebPage schema with basic page information
          </li>
          <li>
            <strong>FAQ Pages</strong> - Auto-detect FAQ content blocks and add FAQPage schema
          </li>
          <li>
            <strong>Product Pages</strong> - Content containing product information will use Product
            schema
          </li>
        </ul>
        <p>
          Organization schema is also included on all pages by default to help search engines
          understand your site&apos;s identity.
        </p>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Manual Schema Customization</h2>
        <p className="mb-4">You can override the automatic schema for any page or post:</p>
        <ol className="list-decimal ml-6 mb-4">
          <li>Edit a page or post</li>
          <li>Find the &quot;Structured Data&quot; section in the sidebar</li>
          <li>
            Change the schema type from &quot;Auto&quot; to a specific type or &quot;Manual
            JSON-LD&quot;
          </li>
          <li>For manual JSON-LD, enter your custom schema in the code editor</li>
        </ol>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Common Schema Types</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Type</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Use For</th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">
                  Benefits
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-medium">BlogPosting</td>
                <td className="py-2 px-4 border-b border-gray-200">Blog posts, articles, news</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Better article display in search, author info
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-medium">WebPage</td>
                <td className="py-2 px-4 border-b border-gray-200">General pages, landing pages</td>
                <td className="py-2 px-4 border-b border-gray-200">Basic SEO improvements</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-medium">FAQPage</td>
                <td className="py-2 px-4 border-b border-gray-200">Pages with Q&A content</td>
                <td className="py-2 px-4 border-b border-gray-200">FAQ rich results in search</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b border-gray-200 font-medium">Product</td>
                <td className="py-2 px-4 border-b border-gray-200">Product pages</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  Product rich results with price, availability
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Testing & Validation</h2>
        <p className="mb-4">
          You can test your structured data using Google&apos;s Rich Results Test:
        </p>
        <Link
          href="https://search.google.com/test/rich-results"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Rich Results Test
        </Link>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="text-xl font-bold mb-4 text-yellow-700">Need Help?</h2>
        <p className="text-yellow-700">
          For more information about structured data, refer to the{' '}
          <a
            href="https://schema.org"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            schema.org
          </a>{' '}
          documentation or contact your development team for assistance.
        </p>
      </div>
    </div>
  )
}

export default SchemaDocsPage
