import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons } from '@expo/vector-icons';
import { events, reviews, trails, type Trail } from './src/app/data/trails';

type MainTab = 'home' | 'search' | 'record' | 'events' | 'profile';
type Screen = MainTab | 'detail' | 'navigation' | 'saved' | 'achievements' | 'settings';

const colors = {
  bg: '#F4F1E8',
  card: '#FFFDF8',
  border: '#DCD7CC',
  forest: '#294936',
  forestSoft: '#3F6A50',
  text: '#1C2A22',
  muted: '#66756B',
  accent: '#D68C45',
  danger: '#BC4B51',
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedTrailId, setSelectedTrailId] = useState<number | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [savedTrailIds, setSavedTrailIds] = useState<number[]>([1, 2]);
  const [joinedEvents, setJoinedEvents] = useState<Record<number, 'yes' | 'maybe'>>({});

  const selectedTrail = trails.find((trail) => trail.id === selectedTrailId) ?? null;
  const activeTab = ['home', 'search', 'record', 'events', 'profile'].includes(screen)
    ? (screen as MainTab)
    : null;

  const openTrail = (trailId: number) => {
    setSelectedTrailId(trailId);
    setScreen('detail');
  };

  const headerTitle =
    screen === 'detail' ? selectedTrail?.name ?? 'Trail Detail' :
    screen === 'navigation' ? 'Navigation' :
    screen === 'saved' ? 'Saved Trails' :
    screen === 'achievements' ? 'Achievements' :
    screen === 'settings' ? 'Settings' :
    screen === 'record' ? 'Recorder' :
    screen === 'events' ? 'Events' :
    screen === 'search' ? 'Search' :
    screen === 'profile' ? 'Profile' :
    'Track Tribe';

  const goBack = () => {
    if (screen === 'detail' || screen === 'navigation') {
      setScreen('home');
      return;
    }
    if (screen === 'saved' || screen === 'achievements' || screen === 'settings') {
      setScreen('profile');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={screen === 'home' || screen === 'search' || screen === 'record' || screen === 'events' || screen === 'profile' ? undefined : goBack} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={20} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Pressable onPress={() => setMenuVisible((current) => !current)} style={styles.iconButton}>
            <Feather name="menu" size={20} color="#fff" />
          </Pressable>
        </View>

        {menuVisible ? (
          <View style={styles.menu}>
            <MenuAction label="Profile" onPress={() => { setMenuVisible(false); setScreen('profile'); }} />
            <MenuAction label="Saved trails" onPress={() => { setMenuVisible(false); setScreen('saved'); }} />
            <MenuAction label="Achievements" onPress={() => { setMenuVisible(false); setScreen('achievements'); }} />
            <MenuAction label="Settings" onPress={() => { setMenuVisible(false); setScreen('settings'); }} />
          </View>
        ) : null}

        <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
          {screen === 'home' && (
            <HomeScreen savedTrailIds={savedTrailIds} onViewTrail={openTrail} />
          )}
          {screen === 'search' && <SearchScreen onViewTrail={openTrail} />}
          {screen === 'record' && <RecordScreen />}
          {screen === 'events' && (
            <EventsScreen joinedEvents={joinedEvents} onJoin={setJoinedEvents} />
          )}
          {screen === 'profile' && (
            <ProfileScreen
              joinedEvents={joinedEvents}
              onOpenSaved={() => setScreen('saved')}
              onOpenAchievements={() => setScreen('achievements')}
              onOpenSettings={() => setScreen('settings')}
            />
          )}
          {screen === 'saved' && (
            <TrailListScreen
              title="Saved for later"
              subtitle="Your shortlist of favorite routes."
              trailIds={savedTrailIds}
              onViewTrail={openTrail}
            />
          )}
          {screen === 'achievements' && <AchievementsScreen />}
          {screen === 'settings' && <SettingsScreen />}
          {screen === 'detail' && selectedTrail && (
            <DetailScreen
              trail={selectedTrail}
              saved={savedTrailIds.includes(selectedTrail.id)}
              onToggleSaved={() => {
                setSavedTrailIds((current) =>
                  current.includes(selectedTrail.id)
                    ? current.filter((id) => id !== selectedTrail.id)
                    : [...current, selectedTrail.id]
                );
              }}
              onStartNavigation={() => setScreen('navigation')}
            />
          )}
          {screen === 'navigation' && selectedTrail && <NavigationScreen trail={selectedTrail} />}
        </ScrollView>

        <View style={styles.tabs}>
          {[
            ['home', 'home-outline', 'Home'],
            ['search', 'search-outline', 'Search'],
            ['record', 'navigate-outline', 'Track'],
            ['events', 'people-outline', 'Events'],
            ['profile', 'person-outline', 'Profile'],
          ].map(([key, icon, label]) => {
            const active = activeTab === key;
            return (
              <Pressable key={key} onPress={() => setScreen(key as MainTab)} style={styles.tab}>
                <View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
                  <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={active ? '#fff' : colors.muted} />
                </View>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen({ savedTrailIds, onViewTrail }: { savedTrailIds: number[]; onViewTrail: (trailId: number) => void }) {
  const [region, setRegion] = useState<string>('All');
  const regions = useMemo(() => ['All', ...Array.from(new Set(trails.map((trail) => trail.region)))], []);
  const filtered = trails.filter((trail) => region === 'All' || trail.region === region);

  return (
    <>
      <Hero title="Native hiking companion" subtitle="This Expo build replaces the Vite web shell with mobile-first screens and interactions." />
      <Section title="Region filter">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {regions.map((option) => (
            <Pill key={option} active={option === region} label={option} onPress={() => setRegion(option)} />
          ))}
        </ScrollView>
      </Section>
      <Section title={`${filtered.length} trails`}>
        {filtered.map((trail) => (
          <TrailCard key={trail.id} trail={trail} saved={savedTrailIds.includes(trail.id)} onPress={() => onViewTrail(trail.id)} />
        ))}
      </Section>
    </>
  );
}

function SearchScreen({ onViewTrail }: { onViewTrail: (trailId: number) => void }) {
  const [query, setQuery] = useState('');
  const filtered = trails.filter((trail) =>
    [trail.name, trail.region, trail.activityType, trail.description].join(' ').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Hero title="Search trails" subtitle="Search remains local and fast in the native build." />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search trails, regions, activities"
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
      <Section title={`${filtered.length} matches`}>
        {filtered.map((trail) => (
          <TrailCard key={trail.id} trail={trail} onPress={() => onViewTrail(trail.id)} />
        ))}
      </Section>
    </>
  );
}

function RecordScreen() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!recording || paused) return;
    const timer = setInterval(() => {
      setElapsed((current) => current + 1);
      setDistance((current) => current + 0.03);
    }, 1000);
    return () => clearInterval(timer);
  }, [recording, paused]);

  return (
    <>
      <Hero title="Activity recorder" subtitle="Timer and offline session state now work in React Native." />
      <Section title="Session stats">
        <StatRow label="Time" value={formatTime(elapsed)} />
        <StatRow label="Distance" value={`${distance.toFixed(2)} km`} />
        <StatRow label="State" value={recording ? (paused ? 'Paused' : 'Recording') : 'Idle'} />
        {!recording ? (
          <PrimaryButton label="Start recording" onPress={() => { setRecording(true); setPaused(false); }} />
        ) : (
          <View style={styles.buttonRow}>
            <PrimaryButton label={paused ? 'Resume' : 'Pause'} onPress={() => setPaused((current) => !current)} compact secondary />
            <PrimaryButton
              label="Stop"
              onPress={() => {
                Alert.alert('Session saved', `Distance: ${distance.toFixed(2)} km\nTime: ${formatTime(elapsed)}`);
                setRecording(false);
                setPaused(false);
                setElapsed(0);
                setDistance(0);
              }}
              compact
              danger
            />
          </View>
        )}
      </Section>
    </>
  );
}

function EventsScreen({
  joinedEvents,
  onJoin,
}: {
  joinedEvents: Record<number, 'yes' | 'maybe'>;
  onJoin: Dispatch<SetStateAction<Record<number, 'yes' | 'maybe'>>>;
}) {
  return (
    <>
      <Hero title="Community events" subtitle="Group hikes and join-state flow now render as native cards." />
      {events.map((event) => (
        <Section key={event.id} title={event.title}>
          <StatRow label="Organizer" value={event.organizer} />
          <StatRow label="Date" value={`${event.date} • ${event.time}`} />
          <StatRow label="Meeting point" value={event.meetingPoint} />
          <Text style={styles.body}>{event.description}</Text>
          {joinedEvents[event.id] ? (
            <Text style={styles.success}>Joined as {joinedEvents[event.id]}</Text>
          ) : (
            <View style={styles.buttonRow}>
              <PrimaryButton label="I'm in" onPress={() => onJoin((current) => ({ ...current, [event.id]: 'yes' }))} compact />
              <PrimaryButton label="Maybe" onPress={() => onJoin((current) => ({ ...current, [event.id]: 'maybe' }))} compact secondary />
            </View>
          )}
        </Section>
      ))}
    </>
  );
}

function ProfileScreen({
  joinedEvents,
  onOpenSaved,
  onOpenAchievements,
  onOpenSettings,
}: {
  joinedEvents: Record<number, 'yes' | 'maybe'>;
  onOpenSaved: () => void;
  onOpenAchievements: () => void;
  onOpenSettings: () => void;
}) {
  const upcoming = events.filter((event) => joinedEvents[event.id]).slice(0, 2);

  return (
    <>
      <Hero title="Ali Mohammadi" subtitle="@ali_mountain • Mountain hiker and route explorer." />
      <Section title="Quick links">
        <View style={styles.buttonRow}>
          <PrimaryButton label="Saved" onPress={onOpenSaved} compact secondary />
          <PrimaryButton label="Achievements" onPress={onOpenAchievements} compact secondary />
          <PrimaryButton label="Settings" onPress={onOpenSettings} compact secondary />
        </View>
      </Section>
      <Section title="Stats">
        <StatRow label="Activities" value="42" />
        <StatRow label="Distance" value="247.5 km" />
        <StatRow label="Elevation gain" value="12450 m" />
      </Section>
      <Section title="Upcoming events">
        {upcoming.length ? upcoming.map((event) => (
          <StatRow key={event.id} label={event.title} value={event.date} />
        )) : <Text style={styles.body}>Join an event to pin it here.</Text>}
      </Section>
    </>
  );
}

function TrailListScreen({
  title,
  subtitle,
  trailIds,
  onViewTrail,
}: {
  title: string;
  subtitle: string;
  trailIds: number[];
  onViewTrail: (trailId: number) => void;
}) {
  const filtered = trails.filter((trail) => trailIds.includes(trail.id));
  return (
    <>
      <Hero title={title} subtitle={subtitle} />
      <Section title={`${filtered.length} saved`}>
        {filtered.map((trail) => (
          <TrailCard key={trail.id} trail={trail} saved onPress={() => onViewTrail(trail.id)} />
        ))}
      </Section>
    </>
  );
}

function DetailScreen({
  trail,
  saved,
  onToggleSaved,
  onStartNavigation,
}: {
  trail: Trail;
  saved: boolean;
  onToggleSaved: () => void;
  onStartNavigation: () => void;
}) {
  const trailReviews = reviews.filter((review) => review.trailId === trail.id);
  const [reportVisible, setReportVisible] = useState(false);
  const [reportText, setReportText] = useState('');

  return (
    <>
      <View style={styles.detailImageWrap}>
        <Image source={{ uri: trail.images[0] }} style={styles.detailImage} />
        <Pressable onPress={onToggleSaved} style={styles.bookmark}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={20} color="#fff" />
        </Pressable>
      </View>
      <Section title={trail.name}>
        <StatRow label="Region" value={trail.region} />
        <StatRow label="Length" value={`${trail.length} km`} />
        <StatRow label="Duration" value={trail.duration} />
        <StatRow label="Status" value={trail.status} />
        <Text style={styles.body}>{trail.description}</Text>
        <View style={styles.buttonRow}>
          <PrimaryButton label="Start navigation" onPress={onStartNavigation} compact />
          <PrimaryButton label="Report" onPress={() => setReportVisible(true)} compact secondary />
        </View>
      </Section>
      <Section title="Safety notes">
        {trail.safetyNotes.map((note) => (
          <Text key={note} style={styles.body}>- {note}</Text>
        ))}
      </Section>
      <Section title={`Reviews (${trailReviews.length})`}>
        {trailReviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewAuthor}>{review.author}</Text>
            <Text style={styles.body}>{review.comment}</Text>
          </View>
        ))}
      </Section>
      <Modal transparent visible={reportVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Report issue</Text>
            <TextInput
              value={reportText}
              onChangeText={setReportText}
              placeholder="Describe the problem on this route"
              placeholderTextColor={colors.muted}
              style={[styles.input, styles.textArea]}
              multiline
            />
            <View style={styles.buttonRow}>
              <PrimaryButton
                label="Submit"
                onPress={() => {
                  Alert.alert('Report submitted', 'The native report flow is now wired to a local placeholder.');
                  setReportText('');
                  setReportVisible(false);
                }}
                compact
              />
              <PrimaryButton label="Cancel" onPress={() => setReportVisible(false)} compact secondary />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function NavigationScreen({ trail }: { trail: Trail }) {
  const [heading, setHeading] = useState(0);
  const [distanceLeft, setDistanceLeft] = useState(trail.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeading((current) => (current + 12) % 360);
      setDistanceLeft((current) => Math.max(0, current - 0.12));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Hero title="Route guidance" subtitle="The navigation screen is now native and ready for future sensor integration." />
      <Section title="Compass">
        <View style={styles.compass}>
          <View style={[styles.needle, { transform: [{ rotate: `${heading}deg` }] }]} />
          <Text style={styles.compassNorth}>N</Text>
        </View>
        <StatRow label="Trail" value={trail.name} />
        <StatRow label="Distance left" value={`${distanceLeft.toFixed(1)} km`} />
        <StatRow label="Next POI" value={trail.pointsOfInterest[0]?.name ?? 'Finish'} />
      </Section>
    </>
  );
}

function AchievementsScreen() {
  return (
    <>
      <Hero title="Achievements" subtitle="Milestones are ported to React Native cards." />
      <Section title="Progress">
        <StatRow label="Unlocked" value="5 / 12" />
        <StatRow label="Distance goal" value="247 / 250 km" />
        <StatRow label="Useful reports" value="7 / 10" />
      </Section>
    </>
  );
}

function SettingsScreen() {
  const [eventAlerts, setEventAlerts] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);
  const [friendsAlerts, setFriendsAlerts] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);

  return (
    <>
      <Hero title="Settings" subtitle="Core toggles are now native components instead of DOM controls." />
      <Section title="Notifications">
        <ToggleRow label="Event reminders" value={eventAlerts} onValueChange={setEventAlerts} />
        <ToggleRow label="Achievement alerts" value={achievementAlerts} onValueChange={setAchievementAlerts} />
        <ToggleRow label="Friend activity" value={friendsAlerts} onValueChange={setFriendsAlerts} />
      </Section>
      <Section title="Privacy">
        <ToggleRow label="Public profile" value={publicProfile} onValueChange={setPublicProfile} />
      </Section>
    </>
  );
}

function TrailCard({ trail, saved, onPress }: { trail: Trail; saved?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.trailCard}>
      <Image source={{ uri: trail.images[0] }} style={styles.trailImage} />
      <View style={styles.trailBody}>
        <View style={styles.trailHeader}>
          <Text style={styles.trailTitle}>{trail.name}</Text>
          {saved ? <Ionicons name="bookmark" size={18} color={colors.forest} /> : null}
        </View>
        <Text style={styles.meta}>{trail.region} • {trail.activityType}</Text>
        <Text numberOfLines={2} style={styles.body}>{trail.description}</Text>
      </View>
    </Pressable>
  );
}

function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.hero}>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroSubtitle}>{subtitle}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function ToggleRow({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ true: colors.forestSoft }} />
    </View>
  );
}

function PrimaryButton({
  label,
  onPress,
  compact,
  secondary,
  danger,
}: {
  label: string;
  onPress: () => void;
  compact?: boolean;
  secondary?: boolean;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        compact && styles.buttonCompact,
        secondary && styles.buttonSecondary,
        danger && styles.buttonDanger,
      ]}
    >
      <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary]}>{label}</Text>
    </Pressable>
  );
}

function Pill({ label, active, onPress }: { label: string; active?: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, active && styles.pillActive]}>
      <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
    </Pressable>
  );
}

function MenuAction({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.menuAction}>
      <Text style={styles.menuActionText}>{label}</Text>
    </Pressable>
  );
}

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.forest },
  container: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.forest, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.12)' },
  menu: { position: 'absolute', top: 72, right: 16, zIndex: 20, backgroundColor: colors.card, borderRadius: 18, borderWidth: 1, borderColor: colors.border, width: 200 },
  menuAction: { paddingHorizontal: 16, paddingVertical: 14 },
  menuActionText: { color: colors.text, fontWeight: '600' },
  scroll: { flex: 1 },
  content: { padding: 16, paddingBottom: 100, gap: 14 },
  hero: { backgroundColor: colors.forest, borderRadius: 24, padding: 20 },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800', marginBottom: 8 },
  heroSubtitle: { color: 'rgba(255,255,255,0.82)', lineHeight: 20 },
  section: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 22, padding: 16, gap: 12 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  input: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, color: colors.text },
  textArea: { minHeight: 110, textAlignVertical: 'top' },
  trailCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 18, overflow: 'hidden', backgroundColor: '#fff' },
  trailImage: { width: '100%', height: 170 },
  trailBody: { padding: 14, gap: 8 },
  trailHeader: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  trailTitle: { flex: 1, color: colors.text, fontSize: 17, fontWeight: '700' },
  meta: { color: colors.muted, fontSize: 13 },
  body: { color: colors.text, lineHeight: 20 },
  buttonRow: { flexDirection: 'row', gap: 10 },
  button: { backgroundColor: colors.forest, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', flex: 1 },
  buttonCompact: { paddingVertical: 12 },
  buttonSecondary: { backgroundColor: '#ECE8DD' },
  buttonDanger: { backgroundColor: colors.danger },
  buttonText: { color: '#fff', fontWeight: '700' },
  buttonTextSecondary: { color: colors.text },
  pill: { backgroundColor: '#ECE8DD', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10, marginRight: 8 },
  pillActive: { backgroundColor: colors.forest },
  pillText: { color: colors.text, fontWeight: '600' },
  pillTextActive: { color: '#fff' },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  statLabel: { color: colors.muted, flex: 1 },
  statValue: { color: colors.text, fontWeight: '700', flex: 1, textAlign: 'right' },
  success: { color: colors.forest, fontWeight: '700' },
  detailImageWrap: { borderRadius: 24, overflow: 'hidden' },
  detailImage: { width: '100%', height: 260 },
  bookmark: { position: 'absolute', top: 16, right: 16, width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  reviewCard: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 12, gap: 6 },
  reviewAuthor: { color: colors.text, fontWeight: '700' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 20 },
  modalCard: { backgroundColor: colors.card, borderRadius: 22, padding: 16, gap: 12 },
  modalTitle: { color: colors.text, fontSize: 20, fontWeight: '700' },
  compass: { alignSelf: 'center', width: 180, height: 180, borderRadius: 90, backgroundColor: '#F1EDE2', borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  needle: { position: 'absolute', width: 4, height: 70, borderRadius: 999, backgroundColor: colors.danger },
  compassNorth: { position: 'absolute', top: 16, color: colors.text, fontWeight: '700' },
  tabs: { position: 'absolute', left: 12, right: 12, bottom: 12, backgroundColor: colors.card, borderRadius: 24, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', paddingVertical: 10 },
  tab: { flex: 1, alignItems: 'center', gap: 6 },
  tabIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  tabIconWrapActive: { backgroundColor: colors.forest },
  tabLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  tabLabelActive: { color: colors.forest },
});
