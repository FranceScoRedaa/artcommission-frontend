export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    roles: string[];
  }
  
  export interface ArtistProfile {
    id: number;
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    bio: string;
    specialties: string;
    yearsOfExperience: number;
    averageRating: number;
    completedCommissions: number;
    profileImageUrl?: string;
  }
  
  export enum ArtCategory {
    ILLUSTRATION = 'ILLUSTRATION',
    ANIMATION = 'ANIMATION',
    CHARACTER_DESIGN = 'CHARACTER_DESIGN',
    PORTRAIT = 'PORTRAIT',
    LANDSCAPE = 'LANDSCAPE',
    CONCEPT_ART = 'CONCEPT_ART',
    DIGITAL_PAINTING = 'DIGITAL_PAINTING',
    CARTOON = 'CARTOON',
    MANGA_ANIME = 'MANGA_ANIME',
    OTHER = 'OTHER'
  }
  
  export interface Portfolio {
    id: number;
    artistId: number;
    artistName: string;
    title: string;
    description: string;
    imageUrl: string;
    category: ArtCategory;
    createdAt: string;
  }
  
  export enum CommissionStatus {
    REQUESTED = 'REQUESTED',
    QUOTED = 'QUOTED',
    ACCEPTED = 'ACCEPTED',
    IN_PROGRESS = 'IN_PROGRESS',
    DRAFT_SUBMITTED = 'DRAFT_SUBMITTED',
    REVISION_REQUESTED = 'REVISION_REQUESTED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
  }
  
  export interface Commission {
    id: number;
    clientId: number;
    clientName: string;
    artistId: number;
    artistName: string;
    title: string;
    description: string;
    category: ArtCategory;
    status: CommissionStatus;
    price?: number;
    deadline?: string;
    finalArtworkUrl?: string;
    createdAt: string;
    completedAt?: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface SignupRequest {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isArtist: boolean;
  }
  
  export interface AuthResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
    roles: string[];
    isArtist: boolean;
  }
  
  export interface PortfolioCreateRequest {
    title: string;
    description?: string;
    imageUrl: string;
    category: ArtCategory;
  }
  
  export interface PortfolioUpdateRequest {
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: ArtCategory;
  }
  
  export interface CommissionCreateRequest {
    artistId: number;
    title: string;
    description: string;
    category: ArtCategory;
    deadline?: string;
  }
  
  export interface CommissionUpdateRequest {
    title?: string;
    description?: string;
    category?: ArtCategory;
    status?: CommissionStatus;
    price?: number;
    deadline?: string;
    finalArtworkUrl?: string;
  }