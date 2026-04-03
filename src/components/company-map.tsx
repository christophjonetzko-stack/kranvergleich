'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.markercluster'

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

    const icon = L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:#2563eb;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16],
    })

    const bounds: L.LatLngExpression[] = []

    // Use marker cluster for large sets (>30), individual markers for small
    const useCluster = companies.length > 30
    const clusterGroup = useCluster
      ? (L as any).markerClusterGroup({
          maxClusterRadius: 40,
          spiderfyOnMaxZoom: true,
          showCoverageOnHover: false,
        })
      : null

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

      if (clusterGroup) {
        clusterGroup.addLayer(marker)
      } else {
        marker.addTo(map)
      }
    }

    if (clusterGroup) {
      map.addLayer(clusterGroup)
    }

    if (bounds.length > 1) {
      map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 13 })
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 14)
    }

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [companies, centerLat, centerLng])

  return (
    <div
      ref={mapRef}
      className="w-full h-[350px] sm:h-[420px] rounded-lg border border-gray-200 z-0"
    />
  )
}
