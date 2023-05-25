import { Breadcrumb } from 'antd';
interface BreadcrumbProps {
  items: Array<BreadcrumbItemProps>;
}

interface BreadcrumbItemProps {
  key: string
  url: string
  name: string
}

function BreadcrumbSection({ items }: BreadcrumbProps) {
  return (
    <Breadcrumb>
      {
        items.map(item => (
          <Breadcrumb.Item key={item.key} href={item.url}>{item.name}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

export default BreadcrumbSection;