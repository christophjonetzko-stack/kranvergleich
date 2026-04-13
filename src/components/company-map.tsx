'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

// Explicit icon — avoids all webpack/turbopack icon resolution issues
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

interface MapCompany {
  name: string
  slug: string
  lat: number
  lng: number
  city: string
  google_rating: number | null
}

interface CompanyMapProps {
  companies: MapCompany[]
  centerLat: number
  centerLng: number
}

export function CompanyMap({ companies, centerLat, centerLng }: CompanyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  // Create map once
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
    }).setView([centerLat, centerLng], 10)

    mapInstanceRef.current = map

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map)

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update markers when companies change (filtering)
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    // Remove all existing marker layers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || (layer as any)._group) {
        map.removeLayer(layer)
      }
    })
    // Remove cluster groups
    map.eachLayer((layer) => {
      if ((layer as any).clearLayers) {
        map.removeLayer(layer)
      }
    })

    if (companies.length === 0) {
      map.setView([centerLat, centerLng], 6)
      return
    }

    const icon = defaultIcon

    const bounds: L.LatLngExpression[] = []

    const clusterGroup = (L as any).markerClusterGroup({
      maxClusterRadius: 40,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount()
        return L.divIcon({
          html: `<div style="width:36px;height:36px;background:rgba(37,99,235,0.85);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:13px;font-family:system-ui;box-shadow:0 2px 6px rgba(0,0,0,.2);">${count}</div>`,
          className: '',
          iconSize: L.point(36, 36),
        })
      },
    })

    for (const c of companies) {
      bounds.push([c.lat, c.lng])
      const rating = c.google_rating ? `★ ${c.google_rating}` : ''
      const marker = L.marker([c.lat, c.lng], { icon })
        .bindPopup(
          `<div style="font-family:system-ui;font-size:13px;line-height:1.4;">` +
            `<strong>${c.name}</strong><br/>` +
            `<span style="color:#6b7280;">${c.city}</span>` +
            (rating ? `<br/><span style="color:#f59e0b;">${rating}</span>` : '') +
            `<br/><a href="/anbieter/${c.slug}" style="color:#2563eb;text-decoration:none;">Profil ansehen &rarr;</a>` +
          `</div>`,
          { maxWidth: 220 }
        )

      clusterGroup.addLayer(marker)
    }

    map.addLayer(clusterGroup)

    // fitBounds to show only visible companies
    if (bounds.length > 1) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 13 })
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14)
    }
  }, [companies, centerLat, centerLng])

  return (
    <div
      ref={mapRef}
      className="w-full h-[350px] sm:h-[420px] rounded-lg border border-gray-200 z-0"
    />
  )
}
