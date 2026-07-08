update page_content
set
  content_json = jsonb_set(
    coalesce(content_json::jsonb, '{}'::jsonb),
    '{equipment}',
    '{
      "title": "Equipment",
      "description": "Advanced production equipment supporting stable quality, capacity, and reliable delivery.",
      "items": [
        {
          "image_url": "https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/pcb-assembly-machine--s5s65d.png",
          "title": "SMT Line",
          "description": "High-speed SMT assembly for fine-pitch components",
          "parameter_label": "Capacity",
          "parameter_value": "45K CPH"
        },
        {
          "image_url": "https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/pcb-aoi-test-machine--ixbpfk.png",
          "title": "AOI System",
          "description": "Automated visual inspection for defects",
          "parameter_label": "Capacity",
          "parameter_value": "99.9% Accuracy"
        },
        {
          "image_url": "https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/pcb-x-ray-machine--3wxmgs.png",
          "title": "X-Ray Inspector",
          "description": "Non-destructive inspection for hidden solder joints",
          "parameter_label": "Capacity",
          "parameter_value": "10μm Resolution"
        },
        {
          "image_url": "https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/ldi-machine--6tczgg.png",
          "title": "LDI Machine",
          "description": "Laser direct imaging for high-precision PCB inner layer patterning",
          "parameter_label": "Resolution",
          "parameter_value": "25 μm / 12 μm"
        },
        {
          "image_url": "https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/pcb-laminating-press-machine--9pbbt7.png",
          "title": "Laminating Press Machine",
          "description": "Multilayer PCB lamination press for bonding inner cores and prepregs under heat and pressure",
          "parameter_label": "Max. Layer",
          "parameter_value": "24 Layers"
        }
      ]
    }'::jsonb,
    true
  ),
  updated_at = now()
from pages
where page_content.page_id = pages.id
  and pages.template_type = 'pcb_board_manufacturing';

