export interface Candidate {
    id: number;
    login: string;
    name: string;
    location: string;
    avatar_url: string;
    email: string | null;
    html_url: string;
    company: string | null;
}