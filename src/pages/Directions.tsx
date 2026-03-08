import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Bus, Car } from "lucide-react";

export default function Directions() {
  return (
    <Layout>
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold tracking-widest text-sm">LOCATION</span>
            <h1 className="text-4xl md:text-5xl font-black mt-3">오시는 길</h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Vertex Capital 본사를 방문해 주셔서 감사합니다.
            </p>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-xl overflow-hidden border border-border mb-12"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.354!2d126.9784!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDMzJzU5LjQiTiAxMjbCsDU4JzQyLjIiRQ!5e0!3m2!1sko!2skr!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertex Capital 위치"
            />
          </motion.div>

          {/* Info cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6 space-y-5"
            >
              <h2 className="text-xl font-bold">본사 정보</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">주소</p>
                  <p className="text-muted-foreground text-sm">서울특별시 강남구 테헤란로 000, 00빌딩 00층</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">대표전화</p>
                  <p className="text-muted-foreground text-sm">02-0000-0000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">업무시간</p>
                  <p className="text-muted-foreground text-sm">평일 09:00 ~ 18:00 (토·일·공휴일 휴무)</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-xl p-6 space-y-5"
            >
              <h2 className="text-xl font-bold">교통 안내</h2>
              <div className="flex items-start gap-3">
                <Bus className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">지하철</p>
                  <p className="text-muted-foreground text-sm">2호선 강남역 0번 출구에서 도보 5분</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bus className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">버스</p>
                  <p className="text-muted-foreground text-sm">간선: 140, 144, 145 / 지선: 3412, 4412</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">자가용</p>
                  <p className="text-muted-foreground text-sm">건물 지하 주차장 이용 가능 (방문 시 2시간 무료)</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
